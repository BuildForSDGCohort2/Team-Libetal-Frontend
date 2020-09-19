# Insights 
These are user accounts to handle transactions made from application sales. 

## Requirements
- Cash transfers
- Transaction receipts


## How personal contributes to a project. 

#### Automated Scenario

#### Stable scenario (No financial input).
In this model every contribution is part of value share. 
If they own the project then they own 100% at the start. of project. 
Financially 100% represents the total cost of development from start to project finish. 
They are entitled to x% fixed share due to project creation. 

Remains (100-x)% of total input required. 

Features will go through evaluation and cost estimation, by a provided project manager by the platform 
or selected from applied platform managers on the platform.  

Developers will have a look of the provided project scope and apply for acceptance. 
Acceptance will depend on evaluation on. 
- Previous work/CV if any is provided. 
- Hourly rates as provided, used to calculate gross input for the project.
- Performance evaluation from other projects. 
- Reviews from work mates in the scope of previous projects(work in progress).

Once the developer is accepted.
From the listed tasks relating to the project one can pick what to work on just implement and commit. 
Once done their work is evaluated by the project manager and depending on the payment agreement their 
cost for implementation is aggregated to the project contributions of others. 

#### Sample Project 
##### __Dukto__
###### Features.
- File sharing. Estimated cost ksh.100 Agreed depending on dev Q totaled to 150  
- IP search. ksh. Estimated cost ksh.100 Agreed depending on dev P totaled to 90  

###### Cost Estimations.
    Total cost of production Estimated. 200 Actual 240;
    Total production cost(After professional evaluation) = 2000;
    
    Developer owns Q,
        TotalProductionCost = 2000
        DevInput = 150 // Evaluated by project manager and agreed by developer per feature added.
        DevPercentageInput = (DevInput/TotalProductionCost).
        FixedShare  = x
        Floatingshare = 100 - FixedShare
        FloatingShareBalance = TotalProductionCost - (FloatingShare/100 * TotalProductionCost)
       
        DevIncome  = DevPercentageInput * FloatingShareBalance


## Data Collection and Usage 
1. Personal Details  
    - User name (onRegister). 
    - Address Data
    - User CV and / Portfolio (onRegister)
        > This might require a validation,  
          Or the platform could provide competence tests i.e [freelancer.com](https://www.freelancer.com/exam/exams)
        - Previous projects if any part of CV
    - User Insights Details, required on financial period end (onRegister/onUpdate).
    - Skill set i.e Developer/Designer/FullStack with sub sections 
        i.e Developer/Kotlin or Developer/Android
    - Payment stipulations. 
        - Hourly payment description (onRegister/onApply for contribution).
2. Contributions
    - Performance based on provided project scale
        - i.e SCRUM performance/Kanban whatever metrics the project will be working with.
        - Lines Of Code Contributed. 
        - Code complexity performance in relation to projects and other developers on the platform. 
    - Number of projects participated in.
    - Commit and commit price evaluation.
    
3. Insights
    - Total Cost of development per project, (Aggregated from added features and bug fixes).
    - % share per project.
    - Transaction details 
        - Payments and withdrawals.
        - Earning history. 
        - Estimated earnings input from incomplete projects.
    
    
