import { useTheme } from "@mui/material/styles";
import { Box, Button, Grid, IconButton, Paper, Switch, TextField, Tooltip, Select, MenuItem, FormControl } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useMemo, useState, useRef } from "react";
import { DataGrid, GridLogicOperator, GridToolbarQuickFilter } from "@mui/x-data-grid";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import SnackbarComponent from "./misc/snackBar";
import { frFR } from "@mui/x-data-grid/locales";
import { useGetAllUsersQuery, useUpdateMutation, useDeactivateMutation, useCreateMutation, useGetRolesQuery } from '../../features/user_crud/crudSlice';
import { alpha } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import { CustomTooltip } from "../client_profile/misc/customTooltip.tsx";

dayjs.extend(utc);

const UserManagement = () => {
  const theme = useTheme();
  const matriculeRef = useRef(null);

  const initialUser = useMemo(() => ({
    username: '',
    creationDate: '',
    lastLogin: '',
    role: '',
    active: ''
  }), []);

  const [editUser, setEditUser] = useState(false);
  const [userData, setUserData] = useState(initialUser);
  const { data: users = [] } = useGetAllUsersQuery();
  const [selectedRole, setSelectedRole] = useState('');
  const { data: rolesList = [] } = useGetRolesQuery();


  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const onHandleNormalError = (errorMessage) => {
    setSnackbarState({
      open: true,
      severity: 'error',
      message: errorMessage,
    });
  };

  const onHandleNormalSuccess = (successMessage) => {
    setSnackbarState({
      open: true,
      severity: 'success',
      message: successMessage,
    });
  };
  const handleCloseSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };


  const handleChangeMatricule = (e) => {
    setUserData({ ...userData, username: e.target.value.replace(/\D/g, '') });
  }

  const [createMutation] = useCreateMutation();
  const [updateMutation] = useUpdateMutation();
  const [deactivateMutation] = useDeactivateMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      ...userData,
      roles: selectedRole
    }
    try {
      const res = await createMutation(user);

      if (res?.data?.message) {
        onHandleNormalSuccess(res?.data?.message);
        setUserData(initialUser);
        setSelectedRole('')
      }


      else onHandleNormalError(res?.error?.data?.message)

    } catch (error) {

    }
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {

      const res = await updateMutation(userData);
      if (res?.data?.message) {
        onHandleNormalSuccess(res?.data?.message);
        setUserData(initialUser);
        setSelectedRole('')
      }
      else onHandleNormalError(res?.error?.data?.message)

    } catch (error) {
    }
  }

  useEffect(() => {
    if (!editUser) {
      setUserData(initialUser);
    }
  }, [editUser, initialUser]);




  const columns = [
    {
      field: 'username',
      headerName: 'Matricule',
      flex: 1,
      sortable: false,
      align: 'center',
      headerClassName: 'bold-weight',
      renderCell: ({ row }) => {
        const paddedUsername = row.username ? String(row.username).padStart(6, '0') : '-';
        return (
          <CustomTooltip title={paddedUsername}>
            {paddedUsername}
          </CustomTooltip>
        );
      }
    },
    {
      field: 'roles',
      headerName: 'Role',
      flex: 1,
      sortable: false,
      align: 'center',
      headerClassName: 'bold-weight',
      renderCell: ({ row }) => {
        let roleText = '-';
        if (row.roles === 1) {
          roleText = 'Administrateur';
        } else if (row.roles === 2) {
          roleText = 'Utilisateur';
        }
        return (
          <CustomTooltip title={roleText}>
            {roleText}
          </CustomTooltip>
        );
      }
    },
    {
      field: 'creationDate',
      headerName: 'Date de création',
      flex: 1,
      sortable: false,
      align: 'center',
      headerClassName: 'bold-weight',
      renderCell: ({ row }) => (
        <CustomTooltip title={row.creationDate ? dayjs.utc(row.creationDate).format("YYYY-MM-DD à HH:mm:ss") : '-'}>
          {row.creationDate ? dayjs.utc(row.creationDate).format("YYYY-MM-DD à HH:mm:ss") : '-'}
        </CustomTooltip>
      )
    },
    {
      field: 'lastLogin',
      headerName: 'Dernière connexion',
      flex: 1,
      sortable: false,
      align: 'center',
      headerClassName: 'bold-weight',
      renderCell: ({ row }) => (
        <CustomTooltip title={row.lastLogin ? dayjs.utc(row.lastLogin).format("YYYY-MM-DD à HH:mm:ss") : '-'}>
          {row.lastLogin ? dayjs.utc(row.lastLogin).format("YYYY-MM-DD à HH:mm:ss") : '-'}
        </CustomTooltip>
      )
    },
    {
      field: 'active',
      headerName: 'Statut',
      flex: 1,
      sortable: false,
      align: 'center',
      headerClassName: 'bold-weight',
      renderCell: ({ row }) => {
        const handleSwitchChange = async (event) => {
          const uId = row.id;
          const { checked } = event.target;
          try {
            const res = await deactivateMutation({ id: uId, isActive: checked });
            onHandleNormalSuccess(res?.data?.message);
          } catch (error) {
            onHandleNormalError(error?.response?.data?.message);
          }
        };

        return (
          <Tooltip title={row.active ? 'Active' : 'Inactive'}>
            <Switch
              checked={row.active}
              onChange={handleSwitchChange}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: theme.palette.secondary.light,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.secondary.light, 0.4),
                  },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: theme.palette.secondary.light,
                },
              }}
            />
          </Tooltip>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      align: 'center',
      headerClassName: 'bold-weight',
      renderCell: ({ row }) => (
        <Tooltip title="Modifier l'utilisateur" placement="top">
          <IconButton onClick={() => {
            setEditUser(true);
            setUserData({ ...userData, ...row });
            if (matriculeRef.current) {
              matriculeRef.current.focus();
            }
          }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )
    }
  ];



  return (
    <div theme={theme}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper sx={{ p: 4, boxShadow: 'none' }}>
            <Box component={"form"} onSubmit={editUser ? handleSubmitEdit : handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} sm={6}>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    id="username"
                    name="username"
                    label="Matricule"
                    value={userData.username || ''}
                    onChange={handleChangeMatricule}
                    inputProps={{
                      minLength: 6,
                      maxLength: 6
                    }}
                    inputRef={matriculeRef}
                    type="tel"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={6}>
                  <FormControl fullWidth size="medium">
                    <InputLabel id="select-label">Role:</InputLabel>
                    <Select
                      labelId="select-label"
                      value={selectedRole}
                      onChange={(event) => setSelectedRole(event.target.value)}
                      required
                    >
                      {rolesList && rolesList.map((role) => (
                        <MenuItem key={role.roleId} value={role.roleId}>{role.roleName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {!editUser ? (
                  <Grid item xs={12} md={2} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      mr={1}
                      sx={{
                        height: '50px',
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.primary.white,
                        fontWeight: 'bold',
                        "&:hover": {
                          backgroundColor: theme.palette.secondary.light,
                        }
                      }}
                    >
                      Ajouter
                    </Button>
                  </Grid>
                ) :
                  <>
                    <Grid item xs={12} md={2} sm={6}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        mr={2}
                        sx={{
                          height: '50px',
                          backgroundColor: theme.palette.secondary.light,
                          color: theme.palette.primary.white,
                          fontWeight: 'bold',
                          "&:hover": {
                            backgroundColor: theme.palette.secondary.light,
                          }
                        }}
                      >
                        Modifier
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={2} sm={6}>
                      <Button
                        onClick={() => {
                          setUserData(initialUser);
                          setEditUser(false);
                        }}
                        fullWidth
                        variant="contained"
                        mr={1}
                        sx={{
                          height: '50px',
                          backgroundColor: theme.palette.secondary.light,
                          color: theme.palette.primary.white,
                          fontWeight: 'bold',
                          "&:hover": {
                            backgroundColor: theme.palette.secondary.light,
                          }
                        }}
                      >
                        Annuler
                      </Button>
                    </Grid>
                  </>
                }
              </Grid>
            </Box>
            <Box sx={{
              mt: 4,
              mb: 4
            }}>
              <DataGrid
                rows={users}
                columns={columns}
                autoHeight
                loading={users.length === 0}
                pageSize={10}
                rowHeight={50}
                rowsPerPageOptions={[10, 25, 100]}
                slots={{ toolbar: QuickSearchToolbar }}
                initialState={{
                  filter: {
                    filterModel: {
                      items: [],
                      quickFilterLogicOperator: GridLogicOperator.Or,
                    },
                  },
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                sx={{
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold',
                  }

                }}
              />

            </Box>
          </Paper>
        </Grid>
      </Grid>
      {snackbarState.open && (
        <SnackbarComponent
          open={snackbarState.open}
          severity={snackbarState.severity}
          message={snackbarState.message}
          handleClose={handleCloseSnackbar}
        />
      )}


    </div>
  );
}

export default UserManagement;

function QuickSearchToolbar() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p="0rem 0.5rem"
      width="100%"
      height="50px"
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
        sx={{
          width: "100%",
          pt: 1.5,
          pb: 0,

        }}
      />

    </Box>
  );
}
