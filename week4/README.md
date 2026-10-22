Lab 5 – Motor Parameter Identification
Overview

This lab focuses on identifying the motor parameters 
𝑇
𝑚
 and 
𝑘
𝑒
 for both drive wheels of a TRIK robot. The experiment uses a PWM sweep from −100% to +100% in steps of 5%, with both wheels spinning freely in the air.

Project Files
File	Description
motor_identification.qrs	TRIK Studio block program used to collect motor data. For each PWM level, it drives motors M3 and M4 for 2 seconds and records the time and both encoder readings.
motor_data.txt	Raw experimental data recorded by the robot. Each line contains PWM percentage, time in milliseconds, left encoder angle, right encoder angle, and battery voltage.
identification.ipynb	Jupyter Notebook used to process the measurements, fit the motor response, identify parameters, and simulate motor behavior using odeint.
report.md	Experiment description, methodology, results, and discussion.
report_figs/omega_all_wheels.png	Steady-state angular velocity versus voltage for both wheels, including fitted 
𝑘
𝑒
 lines.
report_figs/step_response.png	Measured and simulated angular position 
𝜃
(
𝑡
)
 at 100% PWM.
report_figs/table.md	Table of identified 
𝑇
𝑚
 and steady-state angular velocity 
𝜔
𝑠
𝑠
 for each PWM level and wheel.
Methodology

The motor parameters are identified from the measured encoder positions during the PWM sweep.

The angular position response is modeled as:

𝜃
(
𝑡
)
=
𝜔
𝑠
𝑠
(
𝑡
−
𝑇
𝑚
+
𝑇
𝑚
𝑒
−
𝑡
/
𝑇
𝑚
)

where:

𝜃
(
𝑡
)
 is the angular position in radians.
𝜔
𝑠
𝑠
 is the steady-state angular velocity in rad/s.
𝑇
𝑚
 is the motor time constant in seconds.
𝑡
 is the elapsed time in seconds.

The identification procedure consists of:

Applying PWM commands from −100% to +100% in 5% increments.
Recording time, encoder positions, and battery voltage for both motors.
Fitting the motor response to each measurement run.
Estimating the time constant 
𝑇
𝑚
 and steady-state angular velocity 
𝜔
𝑠
𝑠
.
Determining the motor constant 
𝑘
𝑒
 from the relationship between steady-state angular velocity and motor voltage.
Simulating the motor response using odeint and comparing it with experimental measurements.
Results
Wheel	Motor / Encoder	
𝑘
𝑒
 (V·s/rad)	
𝑇
𝑚
 (s)	Dead zone
Left	M3 / E3	0.653	0.149	None at ±5%
Right	M4 / E4	0.705	0.126	None at ±5%
Result Summary
Left wheel (M3/E3): 
𝑘
𝑒
=
0.653
 V·s/rad and 
𝑇
𝑚
=
0.149
 s.
Right wheel (M4/E4): 
𝑘
𝑒
=
0.705
 V·s/rad and 
𝑇
𝑚
=
0.126
 s.
Both wheels respond to commands at ±5% PWM, with no observed dead zone at these tested levels.
The right wheel has a slightly higher identified motor constant and a shorter time constant than the left wheel.
Figures
Steady-State Angular Velocity

!Steady-state angular velocity for both wheels

The plot shows the relationship between motor voltage and steady-state angular velocity for both drive wheels, together with the fitted motor constant lines.

Step
