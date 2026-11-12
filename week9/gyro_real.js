// Lab 9 - gyro parameters, Option A (open loop, in place), TRIK JavaScript.
// Same sequence as gyro_sim.qrs / gyro_real.qrs, but this one can also log the RAW gyro
// (readRawData is not available in diagram blocks).
// Log line: phase,t_ms,t_us,gz_raw,gz_cal,encL,encR      phase: 0 static, 1 sin, 2 rect, 3 rest
// encL = E4, encR = E3

var FILE = "real_gyro_57.csv";
var WARMUP = 120000;                          // ms, robot still, NOT logged
var STATIC = 180000, SIN = 36000, RECT = 36000, REST = 3000;   // ms
var AMP = [30, 60, 150];                      // % ; one step every 3 periods (T = 4 s -> 12 s)
var PERIOD = 10, BLOCK = 20;                  // ~10 ms per sample, write file every 20 samples

function sat(u) { return Math.max(-100, Math.min(100, u)); }

brick.motor("M3").brake();
brick.motor("M4").brake();
script.removeFile(FILE);
script.wait(WARMUP);

var t0 = script.time();
var total = STATIC + SIN + RECT + REST;
var buf = "", n = 0, t = 0;

while (t < total) {
  t = script.time() - t0;
  var phase, u = 0, tau;
  if (t < STATIC) {
    phase = 0;
  } else if (t < STATIC + SIN) {
    phase = 1;
    tau = (t - STATIC) / 1000;
    u = AMP[Math.min(Math.floor(tau / 12), 2)] * Math.sin(2 * Math.PI * tau / 4);
  } else if (t < STATIC + SIN + RECT) {
    phase = 2;
    tau = (t - STATIC - SIN) / 1000;
    u = AMP[Math.min(Math.floor(tau / 12), 2)] * (Math.floor(tau / 2) % 2 == 0 ? 1 : -1);
  } else {
    phase = 3;
  }
  u = sat(u);
  brick.motor("M4").setPower(-u);             // left wheel  (M4/E4 = left, M3/E3 = right, as in Gyro_demo)
  brick.motor("M3").setPower(u);              // right wheel (u > 0 -> CCW)

  var g = brick.gyroscope().read();           // [0..2] mdeg/s, [3] timestamp in us
  var raw = brick.gyroscope().readRawData();
  buf += phase + "," + t + "," + g[3] + "," + raw[2] + "," + g[2] + "," +
         brick.encoder("E4").read() + "," + brick.encoder("E3").read() + "\n";
  if (++n >= BLOCK) { script.writeToFile(FILE, buf); buf = ""; n = 0; }
  script.wait(PERIOD);
}
brick.motor("M3").brake();
brick.motor("M4").brake();
script.writeToFile(FILE, buf);
script.quit();
