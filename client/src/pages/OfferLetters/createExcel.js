import React from 'react'
import ReactExport from "react-export-excel";
import Button from "reactstrap/lib/Button";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const createDataSet = (location) => {
  const dataSet = location.map((data) => {
    return {
      name: data.name,
      university: data.course.university.label,
      course: data.course.program,
      intake: data.intake,
      offerType: data.status.label,
      couns: data.caseHandler
    };
  });

  return (
    <ExcelFile
      element={
        <Button color='warning' style={{ margin: "30px 0px 30px 0px " }}>
          Export Data
        </Button>
      }
    >
      <ExcelSheet data={dataSet} name='Students Pending Fee'>
        <ExcelColumn label='Name' value='name' />
        <ExcelColumn label='University' value='university' />
        <ExcelColumn label='Course' value='course' />
        <ExcelColumn label='Intake' value='intake' />
        <ExcelColumn label='Offer Type' value='offerType' />
        <ExcelColumn label='Counslleor' value='couns' />
      </ExcelSheet>
    </ExcelFile>
  );
};