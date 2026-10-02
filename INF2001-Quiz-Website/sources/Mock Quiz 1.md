# INF2001: Introduction to Software Engineering
## Mock Quiz 1 (Weeks 1 – 5 Comprehensive)

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

#### Question 1 (1 Mark) — SE Foundations & Defect Economics
An automated unit test suite detects an architectural defect during the Implementation phase. According to empirical studies on defect economics covered in class (e.g., Kan et al. / IBM AS/400 study), approximately how much more expensive is it to remediate this defect if it remains undetected until post-delivery maintenance?
* A) Approximately $2\times$ to $4\times$ more expensive
* B) Approximately $5\times$ to $10\times$ more expensive
* C) Approximately $40\times$ to $60\times$ more expensive
* D) Over $200\times$ to $368\times$ more expensive

---

#### Question 2 (1 Mark) — Lifecycle Maintenance Economics
A commercial software company dedicates 70% of its annual engineering budget to post-delivery maintenance. During an operational review, the lead architect allocates budget across three engineering initiatives:
1. Migrating the backend database drivers to maintain compatibility with a major Linux kernel upgrade.
2. Building an automated AI-driven reporting feature requested by major enterprise clients.
3. Patching a race condition in the user authentication module that causes intermittent login crashes.

Under the standard post-delivery maintenance taxonomy taught in INF2001, which initiative corresponds to the category that typically consumes the **largest** share (~60%) of total maintenance effort?
* A) Initiative 1 (Adaptive Maintenance)
* B) Initiative 2 (Perfective Maintenance)
* C) Initiative 3 (Corrective Maintenance)
* D) Initiatives 1 and 3 combined (Preventive Maintenance)

---

#### Question 3 (1 Mark) — SDLC Lifecycles: Rapid Prototyping
A startup project manager wants to shorten time-to-market. She proposes having developers quickly build a rapid throwaway prototype, demonstrate it to investors and clients to refine requirements, skip detailed architectural design, and refactor the prototype code directly into the commercial production release. 

From an established software engineering standpoint, what is the fundamental flaw in this strategy?
* A) Rapid prototyping can only be applied to hardware embedded systems.
* B) Rapid prototyping replaces the requirements/specification phase, **never** the design phase, and prototypes must be discarded rather than evolved into production code.
* C) Rapid prototyping requires formal mathematical Z-specifications before any mockup can be shown to users.
* D) Client demonstration is strictly prohibited during the initial phases of the Rapid Prototyping lifecycle.

---

#### Question 4 (1 Mark) — SDLC Lifecycles: The Spiral Model
In the Boehm Spiral Model, the development trajectory is represented as an expanding spiral progressing across four quadrants. What do the **radial distance from the origin ($r$)** and the **angular rotation ($\theta$)** represent geometrically?
* A) $r$ represents project elapsed calendar days; $\theta$ represents the total number of unresolved software defects.
* B) $r$ represents the cumulative financial cost incurred; $\theta$ represents the progress made through the lifecycle phases.
* C) $r$ represents team velocity in story points; $\theta$ represents the degree of system component coupling.
* D) $r$ represents lines of code produced; $\theta$ represents testing coverage percentage.

---

#### Question 5 (2 Marks) — [MULTI-ANSWER: NO PARTIAL CREDIT] Agile Mindset & Practices
Which of the following statements correctly characterize Agile software development principles and practices as covered in INF2001? *(Select all that apply)*
* [ ] A) Agile fixes project time and cost, but allows project scope to vary by descoping features to protect iteration deadlines.
* [ ] B) In Agile projects, clients and end-users are encouraged to directly alter daily coding tasks and assign developer tickets mid-iteration.
* [ ] C) Agile iterations typically last between 1 to 4 weeks, with working, tested software increments delivered at the end of each iteration.
* [ ] D) The primary mechanism for tracking progress in Agile is developer velocity, and work-in-progress is visually managed via Kanban boards.
* [ ] E) When an Agile team realizes 3 days before sprint completion that two planned user stories cannot be finished, the standard response is to extend the sprint deadline by 1 week.

---

#### Question 6 (1 Mark) — Requirements Engineering: The Moving Target
Three months into building an enterprise inventory system, the client requests a fundamental change to the warehouse batching algorithm. After developers modify the batching module, the automated test suite reports critical runtime calculation errors in the customer invoicing module, which was not modified. 

What phenomenon does this scenario illustrate, and what is its primary root cause?
* A) A usability breakdown caused by the Hawthorne effect.
* B) A regression fault caused by the "moving target" problem during active development.
* C) A formal verification failure resulting from incorrect Function Point weighting.
* D) An architectural dead-end caused by skipping the Inception phase of RUP.

---

#### Question 7 (2 Marks) — [MULTI-ANSWER: NO PARTIAL CREDIT] Characteristics of Good Requirements
Consider the following proposed requirement drafted for an emergency response dispatch system:
> *"The dispatch interface must load quickly and be implemented using React and Node.js with PostgreSQL to guarantee maximum throughput."*

Which of the IEEE / industrial quality criteria for a good requirement are directly violated by this statement? *(Select all that apply)*
* [ ] A) Verifiable
* [ ] B) Implementation-Free
* [ ] C) Traceable
* [ ] D) Clear & Concise

---

#### Question 8 (1 Mark) — Elicitation Techniques & The Hawthorne Effect
A systems analyst shadows hospital triage nurses for two days to document emergency intake procedures. When reviewing her observational notes against the hospital's incident logs, she notices that nurses strictly adhered to all 14 official documentation steps during her observation, yet past incident logs show that nurses routinely bypassed 6 of those steps during peak crisis hours. 

What psychological/observational phenomenon explains this discrepancy?
* A) Groupthink phenomenon
* B) The Hawthorne effect
* C) Cognitive dissonance bias
* D) The moving target effect

---

#### Question 9 (1 Mark) — Use Case Modeling Boundaries
A student is drafting a UML Use Case diagram for a university course registration platform. He includes the following four items as standalone use case ellipses inside the system boundary:
1. `Register for Elective Module`
2. `System Response Time Shall Be Less Than 1.5 Seconds`
3. `Student Must Maintain A Minimum GPA of 2.0`
4. `Drop Module`

Which of these items are **valid** use cases that should remain as ellipses on the diagram?
* A) 1, 2, 3, and 4
* B) 1 and 4 only
* C) 1, 3, and 4 only
* D) 2 and 3 only

---

#### Question 10 (1 Mark) — UML Stereotypes: `<<include>>` vs. `<<extend>>`
In an online banking application, every time a customer executes `Transfer Funds`, the system must unconditionally verify their two-factor biometric token. However, only when the transfer amount exceeds $\$10,000$, the system executes an anti-money laundering compliance review. 

How must these relationships be modeled on a UML Use Case diagram?
* A) `Transfer Funds` points to `Verify Biometrics` using `<<extend>>`; `Compliance Review` points to `Transfer Funds` using `<<include>>`.
* B) `Transfer Funds` points to `Verify Biometrics` using `<<include>>`; `Compliance Review` points to `Transfer Funds` using `<<extend>>`.
* C) `Verify Biometrics` points to `Transfer Funds` using `<<include>>`; `Transfer Funds` points to `Compliance Review` using `<<extend>>`.
* D) Both `Verify Biometrics` and `Compliance Review` point to `Transfer Funds` using `<<include>>`.

---

#### Question 11 (1 Mark) — OO Design Principles: Extend & Hide
A student designs a payroll application where a single class `Employee` contains an attribute `employeeType: {FullTime, Contractor, Intern}`. Inside the `calculateBonus()` method, the student writes nested `switch-case` statements to calculate different bonus percentages based on `employeeType`. 

Why is this design considered a serious object-oriented anti-pattern, and what is the standard refactoring solution?
* A) It violates Information Hiding; refactor by making `employeeType` a public static variable.
* B) It violates the Open-Closed Principle and bloats the class; refactor by subclassing `FullTimeEmployee`, `Contractor`, and `Intern` from an abstract base class/interface and overriding `calculateBonus()` polymorphically.
* C) It violates Encapsulation; refactor by moving the calculation into an external procedural script.
* D) It violates Aggregation rules; refactor by converting `Employee` into a composition container.

---

#### Question 12 (2 Marks) — [MULTI-ANSWER: NO PARTIAL CREDIT] UML Sequence Diagram Notations
Which of the following statements regarding UML Sequence Diagram notations are **correct**? *(Select all that apply)*
* [ ] A) The dashed vertical line descending from an object box represents the object's lifeline (its existence over time).
* [ ] B) An activation rectangle must be drawn across the entire vertical length of the lifeline from the moment the object is created until the diagram ends.
* [ ] C) An `alt` combined fragment represents mutually exclusive execution paths (if-else logic) separated by a horizontal dashed line.
* [ ] D) An `opt` combined fragment is used to represent a loop that repeats until a guard condition becomes false.
* [ ] E) Object destruction is explicitly denoted in UML sequence diagrams by a bold `X` terminating the lifeline.

---

## SECTION B: Short Answer & Calculation Questions (12 Marks)

#### Question 13 (6 Marks) — Function Points (FP) Calculation
An engineering team is estimating the functional size of a new logistics tracking module. Based on the requirements specification, the team identifies the following system components:
* **2 External Inputs ($EI$):** classified as **Average**
* **3 External Outputs ($EO$):** classified as **Complex**
* **4 External Enquiries ($EQ$):** classified as **Simple**
* **1 Internal Logical File ($ILF$):** classified as **Complex**
* **2 External Interface Files ($EIF$):** classified as **Simple**

The team evaluates the 14 General System Characteristics (Technical Complexity Factors) and determines the total Degree of Influence ($DI$) to be **$DI = 25$**.

##### Reference Complexity Matrix (Provided):
| Component Type | Simple | Average | Complex |
| :--- | :---: | :---: | :---: |
| External Input ($EI$) | 3 | 4 | 6 |
| External Output ($EO$) | 4 | 5 | 7 |
| External Enquiry ($EQ$) | 3 | 4 | 6 |
| Internal Logical File ($ILF$) | 7 | 10 | 15 |
| External Interface File ($EIF$) | 5 | 7 | 10 |

**Calculate:**
1. The **Unadjusted Function Points ($UFP$)**. *(Show your itemized summation)* [2 Marks]
2. The **Technical Complexity Factor ($TCF$)**. *(State formula and compute to 2 decimal places)* [2 Marks]
3. The final **Function Point ($FP$) value**. [2 Marks]

---

#### Question 14 (3 Marks) — PERT 3-Point Task Duration Estimation
A project manager is estimating the duration of a critical database migration task for a client's core banking system. The senior database administrator provides the following three-point estimates:
* **Optimistic Duration ($OD$):** $6\text{ days}$ (assuming no schema conflicts or network latency)
* **Most Likely / Expected Duration ($ED$):** $12\text{ days}$ (normal operating conditions)
* **Pessimistic Duration ($PD$):** $24\text{ days}$ (severe data corruption and rollback required)

**Task:**
1. State the **PERT weighted duration formula**. [1 Mark]
2. Calculate the weighted task duration **$D$** in days. [2 Marks]

---

#### Question 15 (3 Marks) — Object-Oriented Analysis & Architectural Multiplicities
Consider a smart office building with **$M = 8$ floors** and an elevator bank with **$N = 2$ elevator cabins**, regulated by a central `Elevator Controller`.

**Questions:**
1. State the exact numeric multiplicity of **Elevator Cabin Buttons** connected to the 1 central controller. *(Formula: $mn : 1$)* [1 Mark]
2. State the exact numeric multiplicity of **Floor Corridor Buttons** connected to the 1 central controller. *(Formula: $(2m - 2) : 1$, assuming intermediate floors have Up/Down buttons while top and bottom floors have 1 button each)* [1 Mark]
3. Why does good object-oriented architecture forbid drawing a direct association line between physical `Button` instances and the `Elevator` motor/cabin actuators? [1 Mark]

---

## SECTION C: Open-Ended Scenario Questions (8 Marks)

#### Question 16 (4 Marks) — Requirements Validation & Quality Analysis
During an SRS review for a neonatal intensive care monitoring platform, an auditor flags the following two requirement statements as unacceptable:

* **Requirement A:** *"The system shall display vital sign alerts instantly to alert clinical staff."*
* **Requirement B:** *"The database shall be developed using Oracle 19c Enterprise Edition on a Red Hat Enterprise Linux server."*

**Tasks:**
1. For **Requirement A**, identify the specific IEEE quality characteristic violated, explain why it is problematic, and provide a concrete, professional rewrite. [2 Marks]
2. For **Requirement B**, identify the specific IEEE quality characteristic violated, explain why it is problematic, and explain how it should be handled. [2 Marks]

---

#### Question 17 (4 Marks) — Dynamic Modeling: Activity Diagrams vs. Sequence Diagrams
A junior systems analyst claims:
> *"Since an Activity Diagram with swimlanes already shows which actor performs which action in sequential order, our team does not need to waste time drawing Sequence Diagrams."*

**Tasks:**
1. Critique the analyst's claim. State the fundamental structural limitation of Activity Diagrams that makes Sequence Diagrams indispensable in Object-Oriented Design. [2 Marks]
2. Explain two key advantages that UML Sequence Diagrams provide over textual pseudocode when presenting complex interactions to stakeholders. [2 Marks]

---
---

# SOLUTIONS & MARKING SCHEME (MOCK QUIZ 1)

---

### Section A: MCQ Answers & Rationales

#### Question 1
* **Correct Answer:** **D**
* **Rationale:** As established in historical defect studies (Kan et al., IBM study) taught in Lecture 1, defect correction costs escalate non-linearly: Requirements ($1\times$) $\rightarrow$ Specification ($3\times$) $\rightarrow$ Design ($4\times$) $\rightarrow$ Implementation ($30\times\text{--}52\times$) $\rightarrow$ Maintenance ($200\times\text{--}368\times$). A defect caught during maintenance costs over $200\times$ more than at requirements, and significantly more than during implementation.

#### Question 2
* **Correct Answer:** **B**
* **Rationale:** In post-delivery maintenance economics:
  * **Perfective Maintenance** (adding new capabilities, features, and performance enhancements like Initiative 2) accounts for **~60%** of all maintenance costs.
  * **Adaptive Maintenance** (modifying system for environment/OS/hardware changes like Initiative 1) accounts for **~20%**.
  * **Corrective Maintenance** (fixing bugs and crashes like Initiative 3) accounts for **~20%**.

#### Question 3
* **Correct Answer:** **B**
* **Rationale:** The absolute invariant of the Rapid Prototyping lifecycle (Lecture 1) is: *Rapid prototyping replaces the requirements/specification phase, **never** the design phase*. Prototypes are quick, throwaway mockups designed to elicit user needs; evolving them into production code creates fragile, unmaintainable systems laden with technical debt.

#### Question 4
* **Correct Answer:** **B**
* **Rationale:** In Boehm's Spiral Model, the geometric dimensions have strict definitions: the radial distance ($r$) from the center represents **cumulative financial cost incurred**, while the angular position ($\theta$) represents **progress made through the 4 lifecycle quadrants**.

#### Question 5
* **Correct Answer:** **A, C, D** *(No partial marks; all 3 must be selected, B and E must be omitted)*
* **Rationale:**
  * **A is correct:** Agile fixes time and cost while varying scope (features are descoped to meet fixed iteration deadlines).
  * **B is incorrect:** Customers/stakeholders collaborate *between* iterations; developers work without customer interference *during* an active iteration.
  * **C is correct:** Sprints/iterations are strictly timeboxed to 1–4 weeks and deliver working increments.
  * **D is correct:** Velocity is the primary empirical metric; Kanban boards track flow.
  * **E is incorrect:** Agile strictly enforces fixed timeboxes; teams descope user stories rather than extending the sprint deadline.

#### Question 6
* **Correct Answer:** **B**
* **Rationale:** Shifting requirements during active development is the textbook definition of the "Moving Target Problem". Modifying one module frequently causes **regression faults** in seemingly unrelated, untouched components.

#### Question 7
* **Correct Answer:** **A, B** *(No partial marks; both must be selected, C and D omitted)*
* **Rationale:**
  * Stating that the interface must load "quickly" is subjective and cannot be objectively measured or tested, violating **Verifiable**.
  * Mandating "React", "Node.js", and "PostgreSQL" dictates technical architecture and tech stacks, violating **Implementation-Free** (requirements must specify *what* the system does, leaving *how* to developers).
  * The requirement does not violate traceability or conciseness on its face.

#### Question 8
* **Correct Answer:** **B**
* **Rationale:** The **Hawthorne effect** is the psychological phenomenon where individuals modify or improve an aspect of their behavior in response to their awareness of being observed (e.g., following official protocol rather than typical real-world shortcuts).

#### Question 9
* **Correct Answer:** **B**
* **Rationale:** Use cases represent **functional goals** initiated by an actor (what the system does). Items 1 and 4 are functional tasks. Item 2 is a performance Non-Functional Requirement (NFR). Item 3 is a business domain rule. NFRs and business rules are documented within the use case text specification, never as independent ellipses.

#### Question 10
* **Correct Answer:** **B**
* **Rationale:**
  * Biometric verification occurs *every time* a transfer is initiated (mandatory sub-goal); hence it is an `<<include>>` relationship pointing **from base (`Transfer Funds`) to included (`Verify Biometrics`)**.
  * Compliance review occurs *only when transfer $> \$10,000$* (conditional behavior); hence it is an `<<extend>>` relationship pointing **from extending (`Compliance Review`) to base (`Transfer Funds`)**.

#### Question 11
* **Correct Answer:** **B**
* **Rationale:** Using internal type enumerations with conditional `switch/case` logic is the classic "God Class" anti-pattern. Adding new employee types forces modification and recompilation of `Employee`, violating the Open-Closed Principle. The standard OO fix is polymorphism via subclassing and method overriding.

#### Question 12
* **Correct Answer:** **A, C, E** *(No partial marks; all 3 must be selected, B and D omitted)*
* **Rationale:**
  * **A is correct:** The dashed vertical line is the lifeline representing existence over time.
  * **B is incorrect:** Activation bars are drawn *only* when a method is actively on the execution call stack, not continuously across the lifeline.
  * **C is correct:** `alt` represents alternative mutually exclusive branches separated by a dashed divider.
  * **D is incorrect:** `loop` represents iteration; `opt` represents an optional single branch (`if` without `else`).
  * **E is correct:** A bold `X` marks destruction.

---

### Section B: Short Answer & Calculations Marking Guide

#### Question 13 (6 Marks)
1. **Unadjusted Function Points ($UFP$):** [2 Marks]
   * $2 \text{ Average } EI = 2 \times 4 = 8$
   * $3 \text{ Complex } EO = 3 \times 7 = 21$
   * $4 \text{ Simple } EQ = 4 \times 3 = 12$
   * $1 \text{ Complex } ILF = 1 \times 15 = 15$
   * $2 \text{ Simple } EIF = 2 \times 5 = 10$
   * **Total $UFP = 8 + 21 + 12 + 15 + 10 = \mathbf{66}$** *(Award 1 mark for component products, 1 mark for sum of 66)*
2. **Technical Complexity Factor ($TCF$):** [2 Marks]
   * Formula: $TCF = 0.65 + (0.01 \times DI)$ [1 Mark]
   * Calculation: $TCF = 0.65 + (0.01 \times 25) = 0.65 + 0.25 = \mathbf{0.90}$ [1 Mark]
3. **Final Function Points ($FP$):** [2 Marks]
   * Formula: $FP = UFP \times TCF$
   * Calculation: $FP = 66 \times 0.90 = \mathbf{59.40}$ *(or $59.4$)* [2 Marks]

#### Question 14 (3 Marks)
1. **PERT Formula:** [1 Mark]
   $$D = \frac{OD + 4ED + PD}{6} \quad \text{or} \quad \frac{1(OD) + 4(ED) + 1(PD)}{6}$$
2. **Calculation:** [2 Marks]
   $$D = \frac{6 + 4(12) + 24}{6} = \frac{6 + 48 + 24}{6} = \frac{78}{6} = \mathbf{13.0\text{ days}}$$
   *(Award 1 mark for substitution, 1 mark for final result of 13 days)*

#### Question 15 (3 Marks)
1. **Cabin Buttons Multiplicity:** **$16 : 1$** ($M \times N = 8 \times 2 = 16$ cabin buttons to 1 controller). [1 Mark]
2. **Floor Buttons Multiplicity:** **$14 : 1$** ($2M - 2 = 2(8) - 2 = 14$ corridor buttons to 1 controller). [1 Mark]
3. **Decoupling Justification:** Direct coupling between inputs (buttons) and physical actuators (elevator motors/doors) tightly couples hardware components, prevents centralized command arbitration (queueing requests, scheduling direction), and bypasses safety interlocks. An intermediate controller decouples boundary sensors from actuators. [1 Mark]

---

### Section C: Open-Ended Scenario Marking Guide

#### Question 16 (4 Marks)
1. **Requirement A Critique & Rewrite:** [2 Marks]
   * *Violation & Critique:* Violates **Verifiable** (or testability). The term "instantly" is subjective and cannot be evaluated by a deterministic pass/fail automated test or inspection. [1 Mark]
   * *Professional Rewrite:* *"The system shall display vital sign alert notifications on the nurse station monitor within 500 milliseconds of sensor threshold violation."* *(Must provide a quantifiable metric).* [1 Mark]
2. **Requirement B Critique & Action:** [2 Marks]
   * *Violation & Critique:* Violates **Implementation-Free**. Functional and software requirements must specify *what* capabilities are needed, not dictate specific vendor database software or operating systems. [1 Mark]
   * *Resolution:* Hardware, OS, and DBMS products should be classified as design constraints or organizational non-functional requirements in system architecture documents, not embedded as functional software requirements. [1 Mark]

#### Question 17 (4 Marks)
1. **Activity Diagrams vs. Sequence Diagrams:** [2 Marks]
   * Activity diagrams model dynamic procedural control flow across partitions (swimlanes), but they **do not model software objects, object lifelines, execution call stacks, or object-oriented message passing (method invocations)**.
   * Sequence diagrams are mandatory in OO design to define class responsibilities, method signatures, return values, and inter-object communication. [2 Marks]
2. **Sequence Diagrams vs. Textual Pseudocode:** [2 Marks] *(Award 1 mark each for any two valid points)*:
   * **2D Visual Bandwidth:** Displays time vertically and interacting entities horizontally simultaneously, allowing rapid absorption of complex concurrency and interactions.
   * **Language-Agnostic Abstraction:** Communicates interface contracts and message flows without getting bogged down in low-level algorithmic syntax or language-specific constructs.
   * **Cross-Functional Communication:** Accessible to architects, QA engineers, and non-coding stakeholders who cannot parse procedural code.
