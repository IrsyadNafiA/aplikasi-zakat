const ZakatColumns = [
  {
    field: "no",
    headerName: "No",
    width: 70,
  },
  { field: "muzaki", headerName: "Muzaki", minWidth: 130, flex: 1 },
  { field: "pengurus", headerName: "Pengurus", minWidth: 130, flex: 1 },
  {
    field: "tipe_zakat",
    headerName: "Tipe",
    type: "number",
    minWidth: 90,
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    minWidth: 160,
    flex: 2,
  },
];

export default ZakatColumns;
