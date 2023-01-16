# CHANGELOG

## v.1.2.0 / 16/01/2023
### **Added**
- emits all socket events when a client connects

## v.1.1.4 / 15/01/2023
### **Bug Fixed***
- remove all from order list now actually does what it says

## v.1.1.3 / 09/01/2023
### **Fixed**
- absent report show only absentees with 3+ days absent status

## v.1.1.2 / 06/01/2023
### **Fixed**
- added another directory for static assets
- absent report includes phone attribute

## v1.1.2 / 04/01/2023
### **Bug fixed**
- joined beneficiary status when fetching beneficiary list
- removed duplicate entries in order list when invoking present multiple times

## v1.1.1 / 02/01/2023
### **Bug fixed**
- added marital status column
- changed image and recoring to optional on mark as visited
- made static assets available
- on mark as visited, children property, request is json string and response is parsed JSON

## v1.1.0 / 31/12/2022
### **Added**
- added "/attendance" before every route
- attendance report implemented
- socket implemented for live daily report (present, meal served and beneficiary count)

### **Bug fixed**
- reset order list when invoking next day

## v1.0.0 / 30/12/2022
### **Added**
- basic CRUD functionalities implemented
- web socket implemented
- attendance actions implemented
