import React, { useEffect, useState } from 'react';
import {Radio,RadioGroup,FormLabel,Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from 'react-select';
import { Label } from '@material-ui/icons';

const ReportingValues = [
  {label: 'Ramesh', value: 'Ramesh'},
  {label: 'Suresh', value:'Suresh'},
  {label: 'Ravi', value:'Ravi'},
  {label: 'Gowtham', value:'Gowtham'},
]

const DepartmentValues = [
  {label: 'ASP.NET', value: 'ASP.NET'},
  {label: 'PHP', value:'PHP'},
  {label: 'Java', value:'Java'},
]

const SkillValues = [
  {label: 'MVC', value:'MVC'},
  {label: 'VB', value:'VB'},
  {label: 'SQL', value:'SQL'},
  {label: 'Jquery', value:'Jquery'},
  {label: 'JavaScript', value:'JavaScript'},
  {label: 'AngularJS', value:'AngularJS'},
  {label: 'NodeJS', value:'NodeJS'},
]


export default function AddIems() {


  const[id,setid]=useState();
  const[FName,setFName]=useState();
  const[LName,setLName]=useState();
  const[Designation,setDesignation]=useState();
  const[Department,setDepartment]=useState();
  const[Skills,setSkills]=useState();
  const[Salary,setSalary]=useState();
  const[JDate,SetJDate] = useState();
  const[ReportingPerson,SetReportingPerson] = useState();
  const[olddata,setOlddata] = useState({Desig:'',Dept:'',Skill:'',R_P:''});
  useEffect(()=>{ 

    var obj = JSON.parse(sessionStorage.getItem('user'));
    setid(obj.id); 
    setFName(obj.FName);
    setLName(obj.LName);
    setDesignation(obj.Designation);
   
    setDepartment(obj.Department);
    setSkills(obj.Skills);
    setSalary(obj.Salary);
    SetJDate(obj.Join_Date);
    SetReportingPerson(obj.Reporting_Person);
    setOlddata({Desig:obj.Designation,Dept:obj.Department,Skill:obj.Skills,R_P:obj.Reporting_Person});
 
  },[]);

  const FNChange =(e)=>{
    setFName(e.target.value);
    }
  const LNChange =(e)=>{
    setLName(e.target.value);
    }
  const DesignationChange =(e)=>{
  setDesignation(e.target.value);
  }

  const SkillsChange =(e)=>{

    var skills  = (Array.isArray(e) ? e.map(x => x.value) : []).join(', ');
       // console.log(skills);
       setSkills(skills);
    }
  const SalaryChange =(e)=>{
    setSalary(e.target.value);
    } 
    const DateChange =(e)=>{
      SetJDate(e.target.value);
      } 
  const DepartmentChange =(e)=>{
  setDepartment(e.value);
  }
  const ReportingChange =(e)=>{
    SetReportingPerson(e.value);
    }

const DeleteRecord = ()=>{
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Accept', 'application/json');
  fetch(`https://localhost:44373/api/values/${id}`,
  {
    method: 'Delete',
    headers: header,
  }).then(result =>result.json()).then(d => alert(d));
}
  const SaveRecord =()=>{
    const Employee = {id:id,First_Name:FName, Last_Name:LName, Designation:Designation, Department:Department,Skills:Skills, Salary:Salary, Join_Date:JDate,Reporting_Person:ReportingPerson};
    const myJSON = JSON.stringify(Employee);
    console.log(myJSON);
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Accept', 'application/json');
    fetch(`https://localhost:44373/api/values/${id}`,{
      method: 'Put',
      headers: header,
      body: myJSON,
    }).then(result =>result.json()).then(d => alert(d));
  }
 
  return (
    <div style={{display:'flex', flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    <div style={{display:'block',maxWidth:'600px',minHeight:'520px',paddingInline:'20px' ,margin: 'auto', border:"3px solid grey", borderRadius:'10px'}}>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Employee Details
      </Typography>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={FName}
            fullWidth
            autoComplete="given-name"
            onChange={FNChange}
          />
      
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={LName}
            fullWidth
            autoComplete="family-name"
            onChange={LNChange}
          />
       <br/>
      <FormLabel component="legend" style={{paddingTop:'10px'}}>Designation</FormLabel>
        <RadioGroup style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} onChange={DesignationChange}>
          <FormControlLabel value="Jr.Developer" control={<Radio />} label="Jr.Developer" />
         <FormControlLabel value="Sr.Developer" control={<Radio />} label="Sr.Developer" />
         <FormControlLabel value="Team Lead" control={<Radio />} label="Team Lead" />
         <FormControlLabel value="Project Lead" control={<Radio />} label="Project Lead" />
        </RadioGroup>
        <br/>
        <Select
        options={DepartmentValues}
        placeholder='Department' 
        className='DropDownList'
        style={{backgroundColor: 'black'}}
        onChange={DepartmentChange}
      />
      <br/>

      <Select
        isMulti= 'true'
        options={SkillValues}
        placeholder='Skills' 
        className='DropDownList'
        style={{backgroundColor: 'black'}}
        onChange={SkillsChange}
      />
         <TextField
            required
            id="Salary"
            name="Salary"
            label="Salary"
            value={Salary}
            fullWidth
            autoComplete="family-name"
            onChange={SalaryChange}
          />

          <TextField
              id="join_date"
              label="Joining Date"
              type="date"
              value={JDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={DateChange}
            />
           <br/>
        


        <Select
        options={ReportingValues}
        placeholder='Reporting Person' 
        className='DropDownList'
        style={{backgroundColor: 'black'}}
        onChange={ReportingChange}
      />
      <br/>
      <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
      <Button variant="contained" color="secondary" onClick={DeleteRecord}>Delete</Button>
      <Button variant="contained" color="primary" onClick={SaveRecord}>Save</Button>
      </div>
    </React.Fragment>

    </div>
    <div style={{paddingRight:'70px',display:'flex',marginInline:'100px',flexDirection:'column'}}>
    <Typography variant="h5" gutterBottom>
        Old Values
      </Typography>
      <Typography variant="h6" gutterBottom>
        Designation : {olddata.Desig}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Department : {olddata.Dept}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Skills : {olddata.Skill}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Reporting Person : {olddata.R_P}
      </Typography>
      </div>
    </div>
  );
}