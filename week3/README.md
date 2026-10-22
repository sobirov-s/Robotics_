# Lab 3: Line following

The robot follows the black line with two light sensors and uses PID, and it slows down in turns so it doesn't fly off the line. In the simulator I tried P, PI, PD, PID and a nonlinear controller, and the nonlinear one worked best because it wobbled less and lost the line less. When there is a gap in the line, the robot drives a soft curve toward the side where it last saw the line and finds it again.

## Real robot (line_real.qrs)

Settings block (runs once):

```
left = sensorA4;
right = sensorA3;
Kp = 1.3;
Ki = 0.01;
Kd = 15;
base = 30;
Ks = 0.35;
integral = 0;
old = 0;
v = base;
```

Loop:

```
err = (sensorA4 - left) - (sensorA3 - right);
p = Kp * err;
integral = integral + err * 0.01;
integral = max(-200, min(200, integral));
i = Ki * integral;
d = Kd * (err - old) / 10;
u = p + i + d;
old = err;
v = base - Ks * abs(err);

motor M3 = v + u;
motor M4 = v - u;
timer 1 ms;
```

## Simulator (line_sim.qrs)

Settings block (runs once):

```
left = sensorA3;
right = sensorA4;
v = 20;
Kp = 0.5;
Ki = 0;
Kd = 0;
Kc = 0.0005;
g = 4;
side = -1;
s = 0;
old = 0;
```

Loop:

```
err = (sensorA4 - right) - (sensorA3 - left);
s = s + err;
u = Kp * err + Ki * s + Kd * (err - old) + Kc * err * err * err;
old = err;

if (sensorA3 < 5 and sensorA4 < 5) {
    s = 0;
    motor M3 = v + side * g;
    motor M4 = v - side * g;
} else {
    if (sensorA4 > 5) { side = 1; } else { side = -1; }
    motor M3 = v + u;
    motor M4 = v - u;
}
timer 30 ms;
```
