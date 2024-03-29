# CHANGELOG

## v.1.4.2 / 27/03/2023
### **Patch**
- included registrationDate when fetching for beneficiary list
- fixed bug when adding existing beneficiary without image

## v.1.4.1 / 10/03/2023
### **Patch**
- removed auth for static assets

## v.1.4.1 / 10/03/2023
### **Patch**
- beneficairy count on socket request doesnt include the deleted beneficiaries

## v.1.4.0 / 09/03/2023
### **Added**
- added auth for routes

## v.1.3.3 / 24/02/2023
### **Patch**
- removed beneficiary name from beneficiary status and log list table

## v.1.3.2 / 22/02/2023
### **Patch**
- absentees report used to send data of the "deleted" beneficiaries

## v.1.3.1 / 18/02/2023
### **Patch**
- added deleted column to beneficiaries
- deleting beneficiary is changed to setting deleted value to true

## v.1.3.0 / 01/02/2023
### **Added**
- added name column to beneficiaryStatus and loglist table

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
