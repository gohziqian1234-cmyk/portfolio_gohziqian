# IoT Video Frame Selection Audit

Source: `assets/videos/iot-smart-plant-monitoring-demo.mp4`
Duration checked: 326.83 seconds

## Component Overview

Candidates compared: 125s, 130s, 132.5s, 135s, 140s.

- 125s is too close to the LED and breadboard.
- 130s and 135s show the circuit, but a hand obscures more of the sensor module.
- 140s clearly shows the ultrasonic sensor but crops the Arduino.
- 132.5s provides the clearest overall balance of the Arduino, breadboard, ultrasonic sensor, LED/buzzer area, rotary control, and connected modules.

Selected: 132.5s. The website adds labels only to components that are genuinely visible in this frame. It does not label or claim a Raspberry Pi or LCD because neither is visible.

## LCD Close-up

Candidates compared: 285s, 290s, 295s, 296s, 300s.

- 285s and 290s show code/output rather than the physical LCD.
- 295s, 296s, and 300s all show the LCD clearly.
- 296s has the best balance of focus, angle, and legible temperature, light, water, and LED readings.

Selected: 296s.

## Arduino-side Hardware Setup

Candidates compared: 200s, 205s, 307.5s, 310s, 315s.

- 200s crops the LCD and several connected parts.
- 205s focuses on the LCD and a cable connection rather than the full circuit.
- 315s is a close-up that crops the breadboard and LCD.
- 307.5s and 310s show the widest complete Arduino-side arrangement; 307.5s is slightly sharper and better centred.

Selected: 307.5s.

## Verified Limitation

The entire 326.83-second video was sampled at one-second intervals (327 frames) before the targeted comparisons above. The 307.5s selection shows the Arduino Uno, breadboard, ultrasonic sensor, LCD, LED/buzzer area, rotary control, connected sensor modules, and wiring. No sampled frame shows a Raspberry Pi in the same physical shot as the complete Arduino circuit. The portfolio therefore describes this image as the **Arduino-side hardware setup** and points readers to the genuine Raspberry Pi data-receipt screenshot under Technical Implementation. No photo was generated, composited, or borrowed from another project.
