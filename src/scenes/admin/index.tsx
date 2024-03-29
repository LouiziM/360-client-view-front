import * as React from 'react';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert, { AlertProps } from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import { createSvgIcon } from '@mui/material/utils';

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridCsvExportOptions,
  GridCsvGetRowsToExportParams,
  gridPaginatedVisibleSortedGridRowIdsSelector,
  gridSortedRowIdsSelector,
  gridExpandedSortedRowIdsSelector,
  useGridApiContext,

} from '@mui/x-data-grid';
import { useTheme } from "@mui/material";
import { useGetAllUsersQuery, useUpdateMutation , useDeleteMutation } from '../../features/user_crud/crudSlice';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}
let idCounter=0 ;
function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    idCounter += 1;
    setRows((oldRows) => [...oldRows, { id:idCounter, username: '', pwd: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [idCounter]: { mode: GridRowModes.Edit, fieldToFocus: 'username' },
     
    }));
  }

  const getRowsFromCurrentPage = ({ apiRef }: GridCsvGetRowsToExportParams) =>
    gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

  const getUnfilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
    gridSortedRowIdsSelector(apiRef);

  const getFilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
    gridExpandedSortedRowIdsSelector(apiRef);

  const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    'SaveAlt',
  );
  const apiRef = useGridApiContext();

  const handleExport = (options: GridCsvExportOptions) =>
    apiRef.current.exportDataAsCsv(options);

  const buttonBaseProps: ButtonProps = {
    color: 'primary',
    size: 'small',
    startIcon: <ExportIcon />,
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Ajouter un Utilisateur
      </Button>

      <GridToolbarColumnsButton />

      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getRowsFromCurrentPage })}
      >
        Exporter la page
      </Button>
      <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getFilteredRows })}
      >
        Lignes filtrées
      </Button>
      <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getUnfilteredRows })}
      >
        Lignes non filtrées
      </Button>
    </GridToolbarContainer>
  );
}
interface User {
  username: string;
  password: string;
  phoneNumber: number;
  id: GridRowId;   
  creationDate: Date;
  lastLogin: Date;
}
const Admin = () => {
  
  const theme = useTheme();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  // Confirmation Dialog (Popup):
  const noButtonRef = React.useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = React.useState<any>(null);
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);
  
  let {  data: users, isError } = useGetAllUsersQuery();

 
  const useFakeMutation = () => {
    return React.useCallback(
      (user: Partial<User>) =>
        new Promise<Partial<User>>((resolve, reject) => {
          setTimeout(() => {
            if (user.username?.trim() === "") {
              reject();
            } else {
              resolve(user);
            }
          }, 200);
        }),
      []
    );
  };
  const mutateRow = useFakeMutation();

  let greatest = 0;

  useEffect(() => {
    if (!isError && users) {
      const mappedRows: GridRowsProp = users.map((user) => {
        const id = user.UserId; 
        greatest = greatest < id ? id : greatest;
        return {
          id,
          username: user.username,
          pwd: "*********",
        };
      });   
      setRows(mappedRows);
      idCounter=greatest
    }
  }, [users, isError]);
  

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow);
    setPromiseArguments(null);
  };

  const [updateMutation, { isLoading }] = useUpdateMutation();

 
  const handleYes = async (id: GridRowId) => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;
  
    try {
      // Make the HTTP request to save in the backend
      await updateMutation(newRow);
      const response = await mutateRow(newRow);
      console.log(rows)
      setSnackbar({ children: 'Changement sauvegardé avec succés', severity: 'success' });
      response.pwd="*********"
      resolve(response);

      setPromiseArguments(null);        
      console.log(rows)
    } catch (error) {
      setSnackbar({ children: "Échec", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };
  

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
    if (!newRow || !oldRow) {
      return null;
    }   
    const mutations: string[] = [];    
    if (newRow.username !== undefined && oldRow.username !== undefined && newRow.username !== oldRow.username) {
      mutations.push(`Nom d'utilisateur de '${oldRow.username}' à '${newRow.username}'`);
    }    
    if (newRow.pwd !== undefined && oldRow.pwd !== undefined && newRow.pwd !== oldRow.pwd) {
      mutations.push(`Mot de passe à '${newRow.pwd || ''}'`);
    }    
    if (mutations.length === 0)    {return null;}   
    return mutations.join(', et le ');
  }
  
  
  

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    const newRow = rows.find((row) => row.id === id);
    const oldRow = rows.find((row) => row.id === id);
  

      // Set the row back to edit mode after saving
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
   
  };
  
      const [deleteMutation] = useDeleteMutation();

      const [deleteConfirmationRowId, setDeleteConfirmationRowId] = useState<GridRowId | null>(null);

      const handleDeleteClick = (id: GridRowId) => () => {
        // Open the confirmation dialog and set the row ID
        setDeleteConfirmationRowId(id);
      };
    
      const handleDeleteConfirmationClose = () => {
        // Close the confirmation dialog
        setDeleteConfirmationRowId(null);
      };
    
      const handleDeleteConfirmationYes = async () => {
        // Perform the deletion
        if (deleteConfirmationRowId !== null) {
          await deleteMutation(deleteConfirmationRowId);
          setRows(rows.filter((row) => row.id !== deleteConfirmationRowId));
          setSnackbar({ children: 'Utilisateur supprimé avec succés', severity: 'success' });
        }
    
        // Close the confirmation dialog
        setDeleteConfirmationRowId(null);
      };
    
      const renderDeleteConfirmationDialog = () => {
        if (deleteConfirmationRowId === null) {
          return null;
        }
    
        const rowToDelete = rows.find((row) => row.id === deleteConfirmationRowId);
    
        return (
          <Dialog
            maxWidth="xs"
            TransitionProps={{ onEntered: handleEntered }}
            open={deleteConfirmationRowId !== null}
          >
            <DialogTitle>Êtes-vous sûr(e) ?</DialogTitle>
            <DialogContent dividers>
              {`Appuyer sur 'Oui' va supprimer l'utilisateur : ${rowToDelete?.username}.`}
            </DialogContent>
            <DialogActions>
              <Button ref={noButtonRef} onClick={handleDeleteConfirmationClose} style={{ backgroundColor: 'red', color: 'white' }}>
                Non
              </Button>
              <Button onClick={handleDeleteConfirmationYes} style={{ backgroundColor: 'grey', color: 'white' }} >Oui</Button>
            </DialogActions>
          </Dialog>
        );
      }; 

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        console.log(newRow);
        console.log(oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Utilisateur',type: 'string', width: 180, editable: true },
    { field: 'pwd', headerName: 'Mot de passe',type: 'string', width: 180, editable: true },
    {
      field: 'phoneNumber',
      headerName: 'Tel',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'lastLogin',
      headerName: 'dérniere connexion',
      type: 'date',
      width: 180,
      editable: false,
    },
    {
      field: 'creationDate',
      headerName: 'Date de création',
      type: 'date',
      width: 180,
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Êtes-vous sûr(e) ?</DialogTitle>
        
        <DialogContent dividers>*
          {`Appuyer sur 'Oui' va changer le ${mutation}.`}
        </DialogContent>
        <DialogActions>
        <Button ref={noButtonRef} onClick={handleNo} style={{ backgroundColor: 'red', color: 'white' }}>
         Non
        </Button>
          <Button onClick={handleYes} style={{ backgroundColor: 'grey', color: 'white' }}>Oui</Button>
        </DialogActions>
      </Dialog>
    );
  };

  

  return (
    <Box
    m="1.5rem 2.5rem"
      
      sx={{
        height: 500,
        
        '& .actions': {
          color: theme.palette.text.secondary,
        },
        '& .textPrimary': {
          color: theme.palette.text.primary,
        },
      }}
    >
      {renderDeleteConfirmationDialog()}

      {renderConfirmDialog()}

      <DataGrid
        localeText={{
          toolbarColumns: "Colonnes",
          toolbarFilters: "Filtrer",
          toolbarDensity: "Densité",
        }}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}

        processRowUpdate={processRowUpdate}

        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
         sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      />
      {!!snackbar && (
        <Snackbar style={{ position: "fixed", marginLeft: "250px", marginBottom: "0px" }} open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
};

export default Admin;
