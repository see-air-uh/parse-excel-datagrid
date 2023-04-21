# Project Overview

This project was created as a default react project with yarn, initialized with:

```bash
yarn create vite
```

This project uses react-dropzone to parse incoming excel files, XLSX to parse excel sheets, and datagrid to send data.

Note: This program will dynamically read the FIRST excel sheet, grab the keys for the json object based on the first row, delete headers, and create a columns and row data set for the Datagrid component.

There is a custom toolbar button that was created (send data button). Currently, this button will console.log out the columns and the row data but this can easily be changed to send the json data to an api to save data into a database (example postgres). This change is done in the App.tsx file.

[Sample node api making CRUD operations](https://www.youtube.com/watch?v=DihOP19LQdg)

This project can be ran with:

```bash
yarn install
```

```bash
yarn run dev
```
