import { useTheme } from "@mui/material/styles";
import { StyledTitles } from "../../utils/js/StyledTitles";
import { Box, Button, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Switch, TextField, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../utils/js/Interceptor";
import { onHandleNormalError, onHandleNormalSuccess } from "../../utils/js";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

import { frFR } from "@mui/x-data-grid/locales";

dayjs.extend(utc);

const UserManagement = () => {

    const theme = useTheme();
    const initialUser = useMemo(() => ({
        matricule: '',
        firstName: '',
        lastName: '',
        idMarque: '',
        nameMarque: ''
    }), []);

    const [editUser, setEditUser] = useState(false);
    const [userData, setUserData] = useState(initialUser);

    const [usersLoading, setUserLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [Marques, setMarques] = useState([]);

    const handleChangeMatricule = (e) => {
        setUserData({ ...userData, matricule: e.target.value.replace(/\D/g, '') });
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get('/lead/Marques');
                setMarques(res?.data?.list);
            } catch (error) {
                onHandleNormalError(error?.response?.data?.message);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            ...userData,
            roleId: 2
        }
        try {
            const res = await axiosInstance.post('/user/create', user);
            onHandleNormalSuccess(res?.data?.message);
            setUserData(initialUser);
            handleData();
        } catch (error) {
            onHandleNormalError(error?.response?.data?.message);
        }
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        let userToEdit = {
            id: userData?.id,
            matricule: userData?.matricule,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            nameMarque: userData?.nameMarque,
            idMarque: userData?.idMarque
        }
        try {
            const res = await axiosInstance.put('/user/update', userToEdit);
            onHandleNormalSuccess(res?.data?.message);
            setUserData(initialUser);
            setEditUser(false);
            handleData();
        } catch (error) {
            onHandleNormalError(error?.response?.data?.message);
        }
    }

    const handleData = async () => {
        try {
            setUserLoading(true);
            const res = await axiosInstance.get('/user/list');
            setUsers(res?.data?.list);
            setUserLoading(false);
        } catch (error) {
            console.log(error);
            setUserLoading(false);
        }
    }

    useEffect(() => {
        handleData();
    }, []);

    const handleActivation = async (elt) => {
        try {
            await axiosInstance.put('/user/activate', {
                id: elt?.id,
                isActive: !elt?.isActive
            });
            handleData();
        } catch (error) {
            onHandleNormalError(error?.response?.data?.message);
        }
    }

    const resetPassword = async (id) => {
        try {
            const res = await axiosInstance.post('/user/reset-password', { id: id });
            onHandleNormalSuccess(res?.data?.message);
        } catch (error) {
            onHandleNormalError(error?.response?.data?.message);
        }
    }

    const columns = [
        {
            field: 'firstName',
            headerName: 'Prénom',
            flex: 1,
            sortable: false,
            align: 'center',
            headerClassName: 'bold-weight',
            renderCell: (params) => (
                <span>{params?.row?.firstName ? params?.row?.firstName : '-'}</span>
            )
        },
        {
            field: 'lastName',
            headerName: 'Nom',
            flex: 1,
            sortable: false,
            align: 'center',
            headerClassName: 'bold-weight',
            renderCell: (params) => (
                <span>{params?.row?.lastName ? params?.row?.lastName : '-'}</span>
            )
        },
        {
            field: 'matricule',
            headerName: 'Matricule',
            flex: 1,
            sortable: false,
            align: 'center',
            headerClassName: 'bold-weight',
            renderCell: (params) => (
                <span>{params?.row?.matricule ? params?.row?.matricule : '-'}</span>
            )
        },
        {
            field: 'nameMarque',
            headerName: 'Marque',
            flex: 1,
            sortable: false,
            align: 'center',
            headerClassName: 'bold-weight',
            renderCell: (params) => (
                <span>{params?.row?.nameMarque ? params?.row?.nameMarque : '-'}</span>
            )
        },
        {
            field: 'roleName',
            headerName: 'Role',
            flex: 1,
            sortable: false,
            align: 'center',
            headerClassName: 'bold-weight',
            renderCell: (params) => (
                <span>{params?.row?.roleName ? params?.row?.roleName : '-'}</span>
            )
        },
        {
            field: 'dateCreation',
            headerName: 'Date de création',
            flex: 1,
            sortable: false,
            align: 'center',
            headerClassName: 'bold-weight',
            renderCell: (params) => (
                <span>{params?.row?.dateCreation ? dayjs.utc(params?.row?.dateCreation).format("YYYY-MM-DD HH:mm:ss") : '-'}</span>
            )
        },
        {
            field: 'isActive',
            headerName: 'Statut',
            flex: 1,
            sortable: false,
            align: 'center',
            headerClassName: 'bold-weight',
            renderCell: (params) => (
                <>
                    <Switch
                        checked={params?.row?.isActive}
                        onChange={() => handleActivation(params?.row)}
                    />
                </>
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            align: 'center',
            headerClassName: 'bold-weight',
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => {
                        setEditUser(true);
                        setUserData({ ...userData, ...params?.row });
                    }}>
                        <Tooltip title="Modifier l'utilisateur" placement="top">
                            <EditIcon />
                        </Tooltip>
                    </IconButton>
                    {/* <IconButton onClick={() => resetPassword(params?.row?.id)}>
                        <Tooltip title="Réinitialiser le mot de passe d'utilisateur" placement="top">
                            <LockResetIcon />
                        </Tooltip>
                    </IconButton> */}
                </>

            )
        }
    ];

    return (
        <div theme={theme}>
            <StyledTitles theme={theme}><p className="titles">Gestion des utilisateurs</p></StyledTitles>
            <Divider sx={{ mt: 1, mb: 6 }} />
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 4, boxShadow: 'none' }}>
                        <Box component={"form"} onSubmit={editUser ? handleSubmitEdit : handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={2} sm={6}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        id="firstName"
                                        name="firstName"
                                        label="Prénom"
                                        value={userData.firstName || ''}
                                        onChange={handleChange}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} md={2} sm={6}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        id="lastName"
                                        name="lastName"
                                        label="Nom"
                                        value={userData.lastName || ''}
                                        onChange={handleChange}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} md={editUser ? 2 : 3} sm={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        id="matricule"
                                        name="matricule"
                                        label="Matricule"
                                        value={userData.matricule || ''}
                                        onChange={handleChangeMatricule}
                                        inputProps={{
                                            maxLength: 6
                                        }}
                                        type="tel"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} md={editUser ? 2 : 3} sm={6}>
                                    <FormControl size="small" fullWidth>
                                        <InputLabel id="marque-label">Marque</InputLabel>
                                        <Select
                                            required
                                            labelId="marque-label"
                                            id="Marque"
                                            name="Marque"
                                            label="Marque"
                                            value={userData.nameMarque || ''}
                                            onChange={(e, c) => {
                                                setUserData({ ...userData, idMarque: c?.props?.main, nameMarque: e?.target?.value });
                                            }}
                                            size="small"
                                        >
                                            {Marques?.map((element) => {
                                                return (
                                                    <MenuItem key={element?.id} main={element?.id} value={element?.name}>{element?.name}</MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {!editUser ?
                                    <Grid item xs={12} md={2} sm={6}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ backgroundColor: theme.colors.blue, height: '100%', fontWeight: 'bold' }}
                                        >
                                            Ajouter
                                        </Button>
                                    </Grid>
                                    :
                                    <>
                                        <Grid item xs={12} md={2} sm={6}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ backgroundColor: theme.colors.blue, height: '100%', fontWeight: 'bold' }}
                                            >
                                                Modifier
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} md={2} sm={6}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                onClick={() => {
                                                    setUserData(initialUser);
                                                    setEditUser(false);
                                                }}
                                                sx={{ backgroundColor: theme.colors.blue, height: '100%', fontWeight: 'bold' }}
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
                                rowHeight={70}
                                loading={usersLoading}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                pageSizeOptions={[10, 25, 100]}
                                rowSelection={false}
                                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default UserManagement;