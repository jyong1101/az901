# INF2001: Introduction to Software Engineering
## Mock Quiz 2 (Weeks 1 – 5 Comprehensive)

---

### Instructions for Candidates
* **Time Allowed:** 45 minutes
* **Total Marks:** 35 marks
* **Assessment Mode:** Closed-Book, Digital (Examena Simulation)
* **Permitted Materials:** Standalone physical calculator, pen/pencil, blank scratch paper (distributed on-site). **Smartphones and digital notes are strictly prohibited.**
* **Structure:**
  * **Section A:** 12 Multiple-Choice Questions (15 Marks)
  * **Section B:** 3 Short Answer & Calculation Questions (12 Marks)
  * **Section C:** 2 Open-Ended Scenario Questions (8 Marks)
* **CRITICAL GRADING NOTICE:** Questions marked with **[MULTI-ANSWER]** carry **NO PARTIAL CREDIT**. You must select *all* correct options and *zero* incorrect options to receive marks for that question.

---

## SECTION A: Multiple-Choice Questions (15 Marks)

#### Question 1 (1 Mark) — Foundational Definitions of Software Engineering
Which of the following pairings correctly aligns the formal definition of Software Engineering with its authoritative source?
* A) **Schach:** The application of a systematic, disciplined, quantifiable approach to development, operation, and maintenance.
* B) **IEEE:** A discipline whose aim is the production of fault-free software, delivered on time and within budget, that satisfies the user's needs.
* C) **IEEE:** The application of a systematic, disciplined, quantifiable approach to the development, operation, and maintenance of software.
* D) **Boehm:** Writing comprehensive documentation before allowing any code implementation to commence.

---

#### Question 2 (1 Mark) — Rational Unified Process (RUP) Architecture
In the Rational Unified Process (RUP), during which of the four business phases is the software architecture primarily baselined, critical risks mitigated, and the majority of use cases prioritized?
* A) Inception
* B) Elaboration
* C) Construction
* D) Transition

---

#### Question 3 (1 Mark) — SDLC Model Selection Tradeoffs
A medical robotics corporation is contracted to develop an unprecedented, safety-critical autonomous surgical system. The domain has high algorithmic uncertainty, complex hardware-software integration risks, and bleeding-edge sensors that require multiple progressive proof-of-concept prototypes before full-scale manufacturing can begin. 

Which SDLC lifecycle model is **most appropriate** for this project?
* A) Pure Waterfall model
* B) Rapid Prototyping model with immediate production cutover
* C) Spiral model
* D) Extreme Programming (XP) with 1-week uninvigilated sprints

---

#### Question 4 (2 Marks) — [MULTI-ANSWER: NO PARTIAL CREDIT] Stakeholder Classification
An engineering team is developing a mobile banking loan application. Match the stakeholders below to their correct categories under INF2001 stakeholder classification:
*(Select all that apply)*
* [ ] A) The Monetary Authority compliance auditor enforcing statutory financial data regulations is an **External Stakeholder**.
* [ ] B) The lead database administrator maintaining server uptime and clustering is an **External Stakeholder**.
* [ ] C) The retail customer who submits loan applications through the mobile app is a **Primary Stakeholder**.
* [ ] D) The telephone helpdesk representative who assists customers with troubleshooting app login errors is a **Secondary Stakeholder**.
* [ ] E) The software quality assurance (QA) automation tester writing test suites is a **Secondary Stakeholder**.

---

#### Question 5 (1 Mark) — Verification vs. Validation
During a formal sprint review, a client tests an automated payroll system and observes:
> *"The tax deduction calculations match the specification document with 100% mathematical accuracy. However, this specification was written using last year's tax brackets, so the computed net salaries are completely incorrect under current employment law."*

Under software engineering definitions, which evaluation failed?
* A) The system was successfully validated, but failed verification.
* B) The system passed verification, but failed validation.
* C) The system failed both verification and validation.
* D) The system passed both verification and validation, but failed regression testing.

---

#### Question 6 (1 Mark) — MoSCoW Prioritization
An e-commerce development team faces a hard legal deadline to launch a retail platform in Singapore by 1 November. Due to unforeseen technical hurdles, two features must be triaged:
* Feature 1: Redacting customer National Registration Identity Card (NRIC) numbers from receipt screens to comply with Singapore Personal Data Protection Act (PDPA) statutory regulations.
* Feature 2: An AI-powered personalized gift recommendation engine that suggests related items on checkout.

Under the MoSCoW prioritization framework, how should these two features be categorized for the 1 November release?
* A) Feature 1 is *Should-have*; Feature 2 is *Must-have*
* B) Feature 1 is *Must-have*; Feature 2 is *Could-have* or *Will-not-have*
* C) Feature 1 is *Could-have*; Feature 2 is *Must-have*
* D) Both features must be categorized as *Must-have*

---

#### Question 7 (1 Mark) — Actor Rules in UML Use Case Modeling
Which of the following statements regarding actors in a UML Use Case diagram is **FALSE**?
* A) Actors must always be positioned outside the system boundary.
* B) Non-human external entities, such as automated third-party payment gateways or hardware temperature sensors, are valid actors.
* C) Actors should be named using generic individual identifiers, such as "User", "Human", or personal names like "John".
* D) A supporting (secondary) actor is an external entity that assists the system in fulfilling a sub-goal initiated by a primary actor.

---

#### Question 8 (1 Mark) — Dynamic Workflow: Activity Diagram Concurrency
In an Activity Diagram modeling an e-commerce order fulfillment system, once an order's payment is cleared, two distinct operations must commence concurrently: `Send Confirmation Email` and `Dispatch Warehouse Picking Slip`. Once **both** operations have finished, the workflow transitions to `Pack Goods`. 

How must this concurrent branching and synchronization be modeled?
* A) Connect `Clear Payment` to a Decision diamond, split into the two activities, and merge them with a Merge diamond.
* B) Connect `Clear Payment` to a Fork bar, split into the two activities, and converge them through a Join bar into `Pack Goods`.
* C) Connect `Clear Payment` to a Fork bar, split into the two activities, and converge them through a Merge diamond into `Pack Goods`.
* D) Connect `Clear Payment` sequentially to `Send Confirmation Email`, then sequentially to `Dispatch Picking Slip`, terminating at a bullseye final node.

---

#### Question 9 (2 Marks) — [MULTI-ANSWER: NO PARTIAL CREDIT] Object-Oriented Analysis: Noun Filtering
During a domain modeling exercise for an automated airport baggage handling system, an analyst extracts the following nouns from the requirements narrative:
1. `Baggage Cart`
2. `Weight Limit Exceeded Event`
3. `Airport Runway`
4. `Conveyor Belt`
5. `Conveyor Speed`

Applying the 4-step OOA derivation rules (Noun Filtering to identify candidate entity classes), which nouns should be **discarded or converted** rather than retained as primary entity classes? *(Select all that apply)*
* [ ] A) `Baggage Cart` should be discarded as an abstract concept.
* [ ] B) `Weight Limit Exceeded Event` should be discarded as an event/state rather than a persistent entity class.
* [ ] C) `Airport Runway` should be discarded as outside the system boundary of baggage handling.
* [ ] D) `Conveyor Belt` should be discarded because physical hardware cannot be represented as classes.
* [ ] E) `Conveyor Speed` should be converted into an attribute of `Conveyor Belt` rather than modeled as a standalone entity class.

---

#### Question 10 (1 Mark) — UML Class Diagram: Visibility & Method Signatures
A class diagram displays an operation declared as:
```text
~reconcileAccounts(inout ledger : Ledger, in cutoffDate : Date) : Boolean
```
What do the visibility modifier `~` and the parameter direction `inout` signify?
* A) The operation is protected, and `ledger` is an immutable input parameter.
* B) The operation is package-private, and `ledger` is passed in, modified by the method, and returned.
* C) The operation is private, and `ledger` is an output-only reference pointer.
* D) The operation is public, and `ledger` is cascade-deleted upon method completion.

---

#### Question 11 (1 Mark) — Project Management: Project vs. Operation
Under the PMBOK definition taught in Lecture 5, which of the following activities is classified as a **Project** rather than an **Operation**?
* A) Providing 24/7 IT helpdesk troubleshooting for staff password resets over the next fiscal year.
* B) Performing weekly automated database index defragmentation and backup tape rotations.
* C) Developing and deploying a custom electronic health record (EHR) migration platform with a scheduled go-live date of 15 December.
* D) Reviewing and publishing monthly departmental staff meeting minutes.

---

#### Question 12 (2 Marks) — [MULTI-ANSWER: NO PARTIAL CREDIT] Estimation & The Cone of Uncertainty
Which of the following statements regarding software estimation dynamics and the Cone of Uncertainty are **correct**? *(Select all that apply)*
* [ ] A) At the initial requirements phase, cost estimates typically exhibit a variance range from $0.25\times$ to $4.00\times$ relative to actual cost.
* [ ] B) Detailed, high-confidence project baseline plans can be established before user requirements are drafted.
* [ ] C) Deliberately overestimating project budgets and durations carries zero business risk because it guarantees the team will not deliver late.
* [ ] D) At the end of the analysis workflow, the estimation variance range narrows to approximately $0.67\times$ to $1.50\times$.
* [ ] E) Empirical research indicates that software project delays are far more frequently caused by omitted/forgotten tasks than by minor calculation errors in estimation formulas.

---

## SECTION B: Short Answer & Calculation Questions (12 Marks)

#### Question 13 (7 Marks) — Use Case Points (UCP) Sizing & Effort Estimation
A software development team is tasked with sizing a new customer portal using Use Case Points (UCP). During analysis, the team identifies the following project metrics:

##### 1. Use Cases Identified:
* **Use Case 1 (UC-1):** `View Account Dashboard` — involves **3 transactions**.
* **Use Case 2 (UC-2):** `Apply for Home Loan` — involves **9 transactions** across main and alternate flows.
* **Use Case 3 (UC-3):** `Update Profile Settings` — involves **5 transactions**.

##### 2. Interacting Actors:
* **Actor 1:** An automated external Credit Bureau system interacting via a **REST API**.
* **Actor 2:** An external payment clearinghouse communicating via a secure **TCP/IP socket protocol**.
* **Actor 3:** A human retail customer interacting via a **mobile web GUI**.

##### 3. Complexity Adjusters:
* Technical Complexity Factor evaluation yields a Degree of Influence: **$DI_{TCF} = 30$**.
* Environmental Factor evaluation yields a Degree of Influence: **$DI_{EF} = 10$**.

##### Reference Complexity Tables (Provided):
| Use Case Complexity | Transaction Count | Weight |
| :--- | :---: | :---: |
| Simple | $\le 3$ transactions | 5 |
| Average | $4 \text{ to } 7$ transactions | 10 |
| Complex | $> 7$ transactions | 15 |

| Actor Classification | Interface Type | Weight |
| :--- | :--- | :---: |
| Simple | Well-defined API | 1 |
| Average | Protocol-based (SOAP, TCP/IP, DB) | 2 |
| Complex | Human via Graphical UI / CLI | 3 |

**Calculate:**
1. The **Unadjusted Use Case Weight ($UUW$)**. [1.5 Marks]
2. The **Unadjusted Actor Weight ($UAW$)** and **Unadjusted Use Case Points ($UUCW$)**. [1.5 Marks]
3. The **Technical Complexity Factor ($TCF$)** and **Environmental Factor ($EF$)**. *(State formulas and compute to 2 decimal places)* [2 Marks]
4. The final **Use Case Points ($UCP$)**. [1 Mark]
5. Total **estimated developer-hours**, assuming an empirical productivity factor of **$20\text{ hours per UCP}$**. [1 Mark]

---

#### Question 14 (2 Marks) — PERT 3-Point Task Duration Estimation
A systems engineer estimates the duration for configuring an automated CI/CD deployment pipeline:
* **Optimistic Duration ($OD$):** $5\text{ days}$
* **Most Likely / Expected Duration ($ED$):** $8\text{ days}$
* **Pessimistic Duration ($PD$):** $17\text{ days}$

**Calculate:**
Compute the weighted PERT duration **$D$** in days. *(State formula and compute exact value)* [2 Marks]

---

#### Question 15 (3 Marks) — Work Breakdown Structure (WBS) Quality Checklist
A project manager decomposes an enterprise software upgrade into a Work Breakdown Structure (WBS).

**Questions:**
1. State the **four PMBOK quality completion rules** for lowest-level work packages in a WBS (covering ownership, output definition, duration limits, and effort limits). [2 Marks]
2. If an architect estimates a software project to cost $\$500,000$ during the initial requirements workflow, what is the expected cost variance range (lower bound and upper bound in dollars) according to the **Cone of Uncertainty**? [1 Mark]

---

## SECTION C: Open-Ended Scenario Questions (8 Marks)

#### Question 16 (4 Marks) — Use Case Modeling & Stereotype Diagnosis
A junior analyst presents the draft UML Use Case diagram described below for a public library digital portal:
1. Inside the system boundary, there is a use case ellipse labeled `Query Oracle Database via SQL`.
2. There is a standalone use case ellipse labeled `Login to Portal`, with dashed arrows labeled `<<extend>>` pointing from `Login to Portal` toward `Borrow Book` and `Search Catalog`.
3. An actor named `MySQL Database Server` is drawn inside the system boundary rectangle.

**Task:**
Critique this diagram. Identify the **three distinct modeling violations**, cite the rule violated in each instance, and state the necessary correction. [4 Marks]

---

#### Question 17 (4 Marks) — Object-Oriented Design: Polymorphism vs. Conditional Anti-Patterns
An e-commerce payment processing module is implemented with the following class structure:

```java
public class PaymentProcessor {
    public void executeTransaction(PaymentType type, double amount) {
        switch(type) {
            case CREDIT_CARD:
                // 30 lines: connect to Visa gateway, validate CVV, debit card
                break;
            case PAYPAL:
                // 25 lines: redirect to OAuth, verify token, debit PayPal
                break;
            case CRYPTOCURRENCY:
                // 40 lines: check gas fee, broadcast wallet transaction
                break;
        }
    }
}
```

**Task:**
1. Explain two major software engineering flaws with this design in terms of **maintainability** and the **Open-Closed Principle (OCP)**. [2 Marks]
2. Describe how to refactor this design using **Inheritance/Interfaces and Polymorphism** to eliminate the `switch` statement, and state the primary architectural benefit of this refactoring when a new payment method (e.g., *Apple Pay*) is introduced. [2 Marks]

---
---

# SOLUTIONS & MARKING SCHEME (MOCK QUIZ 2)

---

### Section A: MCQ Answers & Rationales

#### Question 1
* **Correct Answer:** **C**
* **Rationale:** As taught in Lecture 1:
  * **IEEE Definition:** The application of a *systematic, disciplined, quantifiable* approach to the development, operation, and maintenance of software.
  * **Schach Definition:** A discipline whose aim is the production of *fault-free software, delivered on time and within budget, that satisfies user needs*.

#### Question 2
* **Correct Answer:** **B**
* **Rationale:** In RUP:
  * **Inception:** Establishes scope, feasibility, and business case.
  * **Elaboration:** Refines requirements, prioritizes use cases, mitigates major architectural risks, and **baselines the software architecture**.
  * **Construction:** Heavy coding and component development.
  * **Transition:** Deployment to production and user training.

#### Question 3
* **Correct Answer:** **C**
* **Rationale:** Boehm's Spiral Model is specifically designed for high-risk, unprecedented, large-scale systems where iterative prototyping across multiple cycles resolves critical uncertainties before full construction begins. Waterfall fails on volatile requirements, rapid prototyping alone lacks structured architectural design, and Agile uninvigilated sprints lack mission-critical safety governance.

#### Question 4
* **Correct Answer:** **A, C, D** *(No partial marks; all 3 must be selected, B and E must be omitted)*
* **Rationale:**
  * **A is correct:** Statutory compliance auditors are external entities imposing legal constraints $\rightarrow$ **External Stakeholder**.
  * **B is incorrect:** The lead DBA is part of the internal operations/technical maintenance staff $\rightarrow$ **Primary Stakeholder / Internal Stakeholder**, not external.
  * **C is correct:** Retail borrowers directly operate and benefit from the app $\rightarrow$ **Primary Stakeholder**.
  * **D is correct:** Customer service staff rely on system outputs and support end-users indirectly $\rightarrow$ **Secondary Stakeholder**.
  * **E is incorrect:** QA testers build and verify the system within the engineering team $\rightarrow$ **Internal Stakeholder**, not secondary.

#### Question 5
* **Correct Answer:** **B**
* **Rationale:** 
  * **Verification:** *"Are we building the product right?"* (Conforming to specifications). Since calculations matched the written spec 100%, verification passed.
  * **Validation:** *"Are we building the right product?"* (Meeting user/real-world operational needs). Because the spec was based on outdated laws, the product fails real-world utility, failing validation.

#### Question 6
* **Correct Answer:** **B**
* **Rationale:**
  * Feature 1 enforces compliance with Singapore statutory law (PDPA); failure to redact NRICs makes the software illegal to operate $\rightarrow$ **Must-have ($M$)**.
  * Feature 2 is an auxiliary commercial enhancement that can be deferred without rendering the system illegal or unusable $\rightarrow$ **Could-have ($C$)** or **Will-not-have ($W$)** for this release.

#### Question 7
* **Correct Answer:** **C**
* **Rationale:** Option C is FALSE (and thus the correct choice). Actors must be named strictly by their **functional role** (*Customer*, *Teller*, *Dispatcher*). Generic terms (*User*, *Human*) and proper personal names (*John*, *Mary*) are strictly forbidden.

#### Question 8
* **Correct Answer:** **B**
* **Rationale:** In UML Activity Diagrams:
  * Initiating concurrent parallel flows requires a **Fork bar** (solid horizontal/vertical bar).
  * Synchronizing parallel flows so the next task only proceeds once *all* prior parallel activities finish requires a **Join bar**.
  * Decision and Merge diamonds are for mutually exclusive conditional branches (if/else), not parallel concurrency.

#### Question 9
* **Correct Answer:** **B, C, E** *(No partial marks; all 3 must be selected, A and D omitted)*
* **Rationale:**
  * In Step 2 (Noun Filtering):
    * Discard nouns outside system boundary $\rightarrow$ `Airport Runway` is outside software boundary (Item C).
    * Discard nouns representing events, actions, or states $\rightarrow$ `Weight Limit Exceeded Event` is an event (Item B).
    * Discard nouns representing simple values or attributes $\rightarrow$ `Conveyor Speed` is a numeric attribute of `Conveyor Belt` (Item E).
  * `Baggage Cart` and `Conveyor Belt` are core, data-bearing domain entities and should be retained.

#### Question 10
* **Correct Answer:** **B**
* **Rationale:** In UML class notations:
  * `~` represents **package-private** visibility.
  * `inout` means the parameter is passed into the operation, modified during execution, and returned back to the caller.

#### Question 11
* **Correct Answer:** **C**
* **Rationale:** A project (PMBOK) is a **temporary** endeavour undertaken to create a **unique** product, service, or result. Developing and deploying a new EHR platform with a definitive deadline is a project. Routine helpdesk support, recurring backups, and monthly minutes are repetitive, ongoing **operations**.

#### Question 12
* **Correct Answer:** **A, D, E** *(No partial marks; all 3 must be selected, B and C omitted)*
* **Rationale:**
  * **A is correct:** Initial requirements phase variance is $0.25\times$ to $4.00\times$.
  * **B is incorrect:** Detailed planning requires completed specifications; initial plans prior to requirements are inaccurate.
  * **C is incorrect:** Overestimation incurs heavy **opportunity costs** (tying up engineering capacity and budget that could win other lucrative business).
  * **D is correct:** At the end of analysis, the Cone of Uncertainty narrows to $0.67\times\text{--}1.50\times$.
  * **E is correct:** Studies show schedule slippage is overwhelmingly driven by **forgotten/omitted tasks** rather than estimation formula errors.

---

### Section B: Short Answer & Calculations Marking Guide

#### Question 13 (7 Marks)
1. **Unadjusted Use Case Weight ($UUW$):** [1.5 Marks]
   * UC-1 (3 transactions) = Simple (weight 5) $\rightarrow 1 \times 5 = 5$
   * UC-2 (9 transactions) = Complex (weight 15) $\rightarrow 1 \times 15 = 15$
   * UC-3 (5 transactions) = Average (weight 10) $\rightarrow 1 \times 10 = 10$
   * **$UUW = 5 + 15 + 10 = \mathbf{30}$** [1.5 Marks]
2. **Unadjusted Actor Weight ($UAW$) & $UUCW$:** [1.5 Marks]
   * Actor 1 (API) = Simple (weight 1) $\rightarrow 1 \times 1 = 1$
   * Actor 2 (TCP/IP Protocol) = Average (weight 2) $\rightarrow 1 \times 2 = 2$
   * Actor 3 (Human GUI) = Complex (weight 3) $\rightarrow 1 \times 3 = 3$
   * **$UAW = 1 + 2 + 3 = \mathbf{6}$** [0.5 Mark]
   * **$UUCW = UUW + UAW = 30 + 6 = \mathbf{36}$** [1 Mark]
3. **Technical Complexity Factor ($TCF$) & Environmental Factor ($EF$):** [2 Marks]
   * Formula: $TCF = 0.6 + (0.01 \times DI_{TCF})$
     * $TCF = 0.6 + (0.01 \times 30) = 0.6 + 0.30 = \mathbf{0.90}$ [1 Mark]
   * Formula: $EF = 1.4 + (-0.03 \times DI_{EF})$
     * $EF = 1.4 + (-0.03 \times 10) = 1.4 - 0.30 = \mathbf{1.10}$ [1 Mark]
4. **Final Use Case Points ($UCP$):** [1 Mark]
   * Formula: $UCP = UUCW \times TCF \times EF$
   * $UCP = 36 \times 0.90 \times 1.10 = 32.4 \times 1.10 = \mathbf{35.64}$ [1 Mark]
5. **Estimated Effort (Hours):** [1 Mark]
   * $\text{Effort} = UCP \times 20\text{ hours/UCP} = 35.64 \times 20 = \mathbf{712.8\text{ developer-hours}}$ [1 Mark]

#### Question 14 (2 Marks)
* **PERT Formula:** $D = \frac{OD + 4ED + PD}{6}$
* **Calculation:**
  $$D = \frac{5 + 4(8) + 17}{6} = \frac{5 + 32 + 17}{6} = \frac{54}{6} = \mathbf{9.0\text{ days}}$$
  *(Award 1 mark for formula/substitution, 1 mark for 9.0 days)*

#### Question 15 (3 Marks)
1. **WBS Lowest-Level Task Quality Rules:** [2 Marks] *(Award 0.5 marks for each of the four rules)*:
   * **Single Accountability:** Exactly **one owner** assigned to each task.
   * **Verifiable Deliverable:** Clear, measurable outputs with quality completion criteria.
   * **Duration Boundary:** Task duration must fall between **2 and 20 days**.
   * **Effort Cap:** Required effort must **not exceed 1 person-week**.
2. **Cone of Uncertainty Variance Spread:** [1 Mark]
   * Factor range during initial requirements: **$0.25\times$ to $4.00\times$**.
   * Lower Bound: $\$500,000 \times 0.25 = \mathbf{\$125,000}$
   * Upper Bound: $\$500,000 \times 4.00 = \mathbf{\$2,000,000}$
   * Range: **$[\$125,000, \$2,000,000]$** [1 Mark]

---

### Section C: Open-Ended Scenario Marking Guide

#### Question 16 (4 Marks)
*(Award 1.33 marks per identified violation and correction, up to 4 marks total)*:
1. **Violation 1: Internal Implementation Flow as a Use Case:**
   * *Critique:* `Query Oracle Database via SQL` is an internal architectural data-retrieval mechanism. Use cases must represent observable user **goals** ("what"), not technical mechanics ("how").
   * *Correction:* Remove the ellipse. If database querying supports book searches, integrate the logic inside the `Search Catalog` use case description.
2. **Violation 2: Erroneous `<<extend>>` Relationship and Authentication Modeling:**
   * *Critique:*
     * Arrow direction is inverted: `<<extend>>` arrows must point **from extending to base**.
     * Furthermore, `Login` is not an optional extension of catalog searching; authentication is either a prerequisite precondition or a mandatory included sub-goal (`<<include>>`).
   * *Correction:* Model user authentication as a **Pre-condition** inside the Use Case Description of transactions that require it, or use `<<include>>` pointing from base use cases to `Authenticate User`.
3. **Violation 3: Placement of Internal Database as an Actor:**
   * *Critique:* An actor represents an external entity outside the software boundary. An internal database engine (`MySQL Database Server`) is an internal system component, not an external actor.
   * *Correction:* Remove the database from the actor list; internal subsystems belong within the system boundary architecture (Class/Component diagrams), never as external stick figures on a use case diagram.

#### Question 17 (4 Marks)
1. **Maintainability & OCP Critique:** [2 Marks]
   * *Violation of Open-Closed Principle (OCP):* The class is not closed for modification. Every time a new payment provider is supported, developers must modify and re-test the core `PaymentProcessor` class, introducing regression risks. [1 Mark]
   * *Maintainability & Bloat:* Embedding diverse vendor APIs (Visa, PayPal, Crypto) in one method violates Single Responsibility, inflating class complexity and creating tight coupling. [1 Mark]
2. **Polymorphic Refactoring & Architectural Advantage:** [2 Marks]
   * *Refactoring:* Define a common interface or abstract base class `PaymentStrategy` (or `PaymentMethod`) declaring `void pay(double amount)`. Create separate subclasses (`CreditCardPayment`, `PayPalPayment`, `CryptoPayment`) that implement `pay()`. The `PaymentProcessor` class simply calls `method.pay(amount)` without conditional branching. [1 Mark]
   * *Benefit of Adding New Method:* When adding *Apple Pay*, developers simply create a new class `ApplePayPayment implements PaymentStrategy` without touching or recompiling the existing, tested `PaymentProcessor` code. [1 Mark]
