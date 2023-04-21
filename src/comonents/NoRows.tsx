// ExcelDropzone.tsx
import { GridColDef } from "@mui/x-data-grid";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

interface ExcelDropzoneProps {
  onFileProcessed?: (data: unknown) => void;
  onColumnsProcessed?: (columns: GridColDef[]) => void;
}
const ExcelDropzone: React.FC<ExcelDropzoneProps> = ({
  onFileProcessed,
  onColumnsProcessed,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        // Add custom sheet parsing logic here
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          const firstSheetName = workbook.SheetNames[0];
          const firstSheet = workbook.Sheets[firstSheetName];

          const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

          const keys = sheetData[0];
          const jsonData = sheetData
            .slice(1)
            .map((row: any, rowIndex: number) =>
              row.reduce((obj: any, value: any, index: number) => {
                obj[keys[index]] = value;
                obj.id = rowIndex + 1; // Add an "id" prop. required for datagrid
                return obj;
              }, {})
            )
            .filter((obj: any) => Object.keys(obj).length > 1);

          const columnDefs: GridColDef[] = keys.map(
            (key: string, index: number) => ({
              field: key,
              headerName: key,
              width: 150,
              editable: true,
              type: "string",
            })
          );
          columnDefs.push({ field: "id", headerName: "id", width: 90 }); // added as needed for mui
          if (onColumnsProcessed) {
            onColumnsProcessed(columnDefs);
          }

          if (onFileProcessed) {
            onFileProcessed(jsonData);
          }
        };

        reader.readAsArrayBuffer(file);
      });
    },
    [onFileProcessed, onColumnsProcessed]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".xls,.xlsx",
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #999",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the Excel file here...</p>
      ) : (
        <p>Drag and drop an Excel file here, or click to select a file.</p>
      )}
    </div>
  );
};

export default ExcelDropzone;
