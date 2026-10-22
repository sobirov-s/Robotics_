Lab 5 – Motor Parameter Identification
Objective

The goal of this laboratory work is to identify the motor parameters 
𝑇
𝑚
 and 
𝑘
𝑒
 for both TRIK robot drive wheels using a PWM sweep from −100% to +100% with a step of 5%. The measurements are performed while the wheels are spinning freely in the air.

Experimental Setup
Robot: TRIK
Left motor: M3 (encoder E3)
Right motor: M4 (encoder E4)
PWM range: −100% to +100%
PWM step: 5%
Duration per PWM level: 2 seconds

The robot records the PWM command, elapsed time, encoder readings, and battery voltage for each measurement.

Repository Contents
File	Description
motor_identification.qrs	TRIK Studio block program for collecting experimental data
motor_data.txt	Raw motor measurement data
identification.ipynb	Data analysis, parameter estimation, and motor simulation
report.md	Detailed laboratory report
report_figs/omega_all_wheels.png	Steady-state angular velocity versus voltage for both wheels
report_figs/step_response.png	Measured and simulated step response at 100% PWM
report_figs/table.md	Identified time constants and steady-state angular velocities for each PWM level
Mathematical Model

The angular position response of the motor is modeled as

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
 — angular position (rad)
𝜔
𝑠
𝑠
 — steady-state angular velocity (rad/s)
𝑇
𝑚
 — motor time constant (s)
𝑡
 — elapsed time (s)

The motor parameters are estimated by fitting the model to the measured encoder data. The steady-state angular velocity is then analyzed as a function of motor voltage to identify 
𝑘
𝑒
. The model is also simulated using odeint.

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

The right wheel has a higher identified motor constant and a shorter time constant than the left wheel.

Experimental Results
Angular Velocity vs. Voltage

!Angular velocity versus voltage for both wheels

Step Response at 100% PWM

!Measured and simulated step response

How to Run
Clone or download this repository.
Install Python 3 and the required libraries: numpy, pandas, scipy, and matplotlib.
Open identification.ipynb in Jupyter Notebook.
Run the notebook cells to process the measurements, estimate the motor parameters, and generate the plots.

Make sure the data file and figure paths match the directory structure expected by the notebook.

Conclusion

The motor parameters of both TRIK drive wheels were identified using experimental encoder measurements. The estimated time constants and motor constants can be used to simulate motor dynamics and support the development of robot motion-control algorithms.

The differences between the left and right motor parameters should be considered when implementing precise differential-drive control.
