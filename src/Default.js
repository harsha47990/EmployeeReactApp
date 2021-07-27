import { Button,TextField} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { DataGrid,GridToolbar } from '@material-ui/data-grid';

import React, { useState, useEffect,useStyles} from "react";
import Select from 'react-select';
import EditRecored from './EditRecord';
import './Default.css';
import { Redirect,useHistory } from "react-router-dom";



export default function Default(){

  const history = useHistory();
  const row = [
 //   {id:'',FName:'harsha',LName:'naidu', Designation:'Jr.Developer',Department :12345, Skills:'Bangalore',Salary :12345,Join_Date:'20-07-2020',Reporting_Person:'Ramesh' },
   ];

    const[data,setdata] = useState([]);
  
    const[rows,setRows]= useState([]);
    useEffect(() => {
      var jsonbody = `{
        "id": 4,
        "First_Name": "Pooja",
        "Last_Name": "Martha",
        "Designation": "Project Lead",
        "Department": "ASP.NET",
        "Skills": "MVC,NodeJS,SQL",
        "Salary": "80000",
        "Join_Date": "22-07-2021",
        "Reporting_Person": "Ramesh",
        "Status": 1
    }`;
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append('Accept', 'application/json');
      
    fetch("https://localhost:44373/api/values",{
      method: 'Get',
      headers: header,
    }).then(result =>result.json())
    .then(
      ary => {
        ary.map((d)=>{
          const Employee = {id:d.id, FName:d.First_Name, LName:d.Last_Name, Designation:d.Designation, Department:d.Department,Skills:d.Skills, Salary:d.Salary, Join_Date:d.Join_Date,Reporting_Person:d.Reporting_Person};
          row.push(Employee);
        })
      setRows(row);
    }
      );
    },[]);


return(
    <div>
      <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        onRowDoubleClick={(row)=>{ 
          var item = rows.map((d)=>{
            if(d.id==row.id)
            {
              sessionStorage.setItem('user', JSON.stringify(d));
            }
          });
           history.push('EditRecord');} }
        components={{
          Toolbar: GridToolbar
        }}
        
      />
      </div>
    </div>
)

}


const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'FullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'FName') || ''} ${
        params.getValue(params.id, 'LName') || ''
      }`,
  },
  {
    field: 'Designation',
    headerName: 'Designation',
    width: 200,
  },
  {
    field: 'Department',
    headerName: 'Department',
    width: 200,
  },
  {
    field: 'Join_Date',
    headerName: 'Join Date',
    width: 200,
  },
  {
    field: 'Reporting_Person',
    headerName: 'Reporting Person',
    width: 200,
  },
  
];



/*

const listElements = employees.map((emp) =>
    <Employee key={emp.Id}  data={emp} />
  );

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function Employee(props) {
  return (
  <div style={{display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'space-around', border:"3px solid white"}}> 
      <p>{props.data.FName +" "+ props.data.LName}</p>
      <p>{props.data.Designation}</p>
      <p>{props.data.Department}</p>
      <p>{props.data.Join_Date}</p>
      <p>{props.data.Reporting_Person}</p>
      <Button style={{color:'white'}}>Edit</Button>
  </div>
  );

}

  <label>Filter Options</label>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center' ,justifyContent:'space-between',backgroundColor:'white'}}>
        <TextField
          id="outlined-secondary"
          label='Name'
          variant="outlined"
          color="secondary"
          size="small"
        />
        
        <Select
        isMulti= 'true'
        options={options}
        placeholder='Department' 
        className='DropDownList'
        style={{backgroundColor: 'black'}}
      />
       
         <TextField
          id="date"
          label="From Date"
          type="date"
          defaultValue='2017-05-24'
        />
         <TextField
          id="date"
          label="To Date"
          type="date"
          defaultValue='2017-05-24'
          style={{backgroundColor:'white',maxHeight:'1.3cm'}}
        />
      <Button
            variant="contained"
            color="primary"
            className="submit"
            > Create
      </Button>
      </div>
/////////////
      <div style={{backgroundColor:'grey', color:'white'}}>
          <div style={{display:'flex',flexDirection:'row',alignContent:'center',justifyContent:'space-around', border:"3px solid white"}}> 
            <p>Full Name</p>
            <p>Designation</p>
            <p>Department</p>
            <p>Joining Date</p>
            <p>Reporting Person</p>
            <p style={{visibility:'hidden'}}>Edit</p>
        </div>
         <div>
          {listElements}
         </div>
       </div>
       <Pagination count={10} showFirstButton showLastButton />
       */