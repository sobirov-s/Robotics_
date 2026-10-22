# Lab 2 - PID, trajectory 61

First I used Ziegler-Nichols: I kept raising Kp until the wheel started shaking around the target, which happened at Kp = 4.5 (so Ku = 4.5 and Tu = 0.2 s), and the Ziegler-Nichols formulas gave me Kp = 2.7, Ki = 0.54, Kd = 3.4.
With these numbers the robot drove way past the target, to 58 cm instead of 30, so I removed I and D and made Kp smaller: my final values are Kp = 1.5, Ki = 0, Kd = 0, and the table below shows my tries (A and B are the bad ones).
Compared to Lab 1 it is much easier now: before, I had to guess a delay for every line, and now I just say "30 cm" or "90 degrees" and the robot stops by itself when the wheels have turned enough, so in the simulator the 61 came out with straight lines and closed corners.
PID can't fix everything though: if a wheel slips, the encoders don't notice it, and the robot thinks everything is fine.
I couldn't try it on the real robot because it didn't work again this time, so there is no video; for the real robot I set Kp = 3, Kd = 6 and 40 % power, because a real robot has friction and doesn't stop instantly, but I haven't tested these values.

| Set | Kp | Ki | Kd | What happened (drive 30 cm in the simulator) |
|---|---|---|---|---|
| A (bad) | 0.1 | 0 | 0 | only 26.7 cm after 4 s |
| B (bad, Ziegler-Nichols) | 2.7 | 0.54 | 3.4 | drove past the target to 58 cm |
| C | 2.7 | 0 | 3.4 | stopped at 30 cm after 1.3 s |
| D | 2.7 | 0 | 0 | stopped at 30 cm after 1.2 s |
| E (final) | 1.5 | 0 | 0 | stopped at 30 cm after 1.4 s |
