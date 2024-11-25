import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { readItems, deleteItem, createItem, updateItem } from './servicios/firebase';
import { useAppContext } from './Context/appContext';
import { useTheme } from '@mui/material/styles';

function EditToolbar({ setRows, setRowModesModel }) {
  const handleClick = () => {
    const id = new Date().getTime().toString();
    setRows((oldRows) => [
      ...oldRows,
      { id, nombre: '', telefono: '', servicio: '', fecha: '', hora: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'nombre' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const { objectData, updateObject } = useAppContext();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const theme = useTheme();
  // Cargar datos de Firestore
  useEffect(() => {
    const fetchCitas = async () => {
      const citas = await readItems(objectData.uid);
      setRows(citas); // Actualiza las filas con los datos de Firestore
    };
    fetchCitas();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  

  const handleDeleteClick = (id) => () => {
    const itemToDelete = rows.find((row) => row.id === id);
    setRows(rows.filter((row) => row.id !== id));
    createItem(itemToDelete,"Eliminados");
    deleteItem(id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    updateItem(updatedRow.id, updatedRow);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 180, editable: true },
    { field: 'telefono', headerName: 'Teléfono', width: 140, editable: true },
    { field: 'servicio', headerName: 'Servicio', width: 180, editable: true },
    { field: 'fecha', headerName: 'Fecha', width: 140, editable: true },
    { field: 'hora', headerName: 'Hora', width: 120, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
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

  return (
    <Box>
      <Box>
         a
      </Box>
    <Box sx={{ height: 500, width: '100%',
      bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'white', }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // slots={{
        //   toolbar: EditToolbar,
        // }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sx={{
          color: theme.palette.mode === 'dark' ? 'white' : 'black',
        }}
      />
    </Box>
    </Box>
  );
}
