
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HardwareInstructions: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    const audio = new Audio('/button-click.mp3');
    audio.play()
      .then(() => {
        setTimeout(() => {
          navigate('/');
        }, 300);
      })
      .catch(err => {
        console.error('Error playing sound:', err);
        navigate('/');
      });
  };
  
  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl font-game text-primary text-center mb-8">Hardware Setup</h1>
      
      <Card className="w-full max-w-3xl mx-auto border-primary bg-card mb-6">
        <CardHeader>
          <CardTitle className="font-game text-primary">Materials Needed</CardTitle>
          <CardDescription className="font-game text-sm">Components for your buzz wire game</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 font-game text-sm">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Raspberry Pi with 7" touch display</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Copper wire (for the winding path)</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Metal loop on a wand</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Small buzzer or speaker</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>LED indicator light</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>GPIO connection wires</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="w-full max-w-3xl mx-auto border-primary bg-card mb-6">
        <CardHeader>
          <CardTitle className="font-game text-primary">Connection Diagram</CardTitle>
          <CardDescription className="font-game text-sm">How to connect hardware components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-6 rounded-lg mb-4">
            <div className="aspect-video bg-card flex items-center justify-center border border-dashed border-primary">
              <p className="text-center font-game text-sm text-muted-foreground">
                Hardware connection diagram goes here
              </p>
            </div>
          </div>
          
          <div className="space-y-4 font-game text-sm">
            <div>
              <h3 className="font-bold mb-1">Wire Connection:</h3>
              <p>Connect the copper wire to GPIO pin 17 and ground.</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">Loop Connection:</h3>
              <p>Connect the metal loop to GPIO pin 27 and 5V power.</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">Buzzer Connection:</h3>
              <p>Connect the buzzer to GPIO pin 22 and ground.</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">LED Connection:</h3>
              <p>Connect LED to GPIO pin 23 and ground through a 330 ohm resistor.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="w-full max-w-3xl mx-auto border-primary bg-card">
        <CardHeader>
          <CardTitle className="font-game text-primary">Pi GPIO Setup Code</CardTitle>
          <CardDescription className="font-game text-sm">Python code for the hardware interaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg overflow-auto">
            <pre className="text-xs">
              <code>
{`import RPi.GPIO as GPIO
import time
import requests

# Setup GPIO pins
GPIO.setmode(GPIO.BCM)
WIRE_PIN = 17
LOOP_PIN = 27
BUZZER_PIN = 22
LED_PIN = 23

# Configure pins
GPIO.setup(WIRE_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(LOOP_PIN, GPIO.OUT)
GPIO.setup(BUZZER_PIN, GPIO.OUT)
GPIO.setup(LED_PIN, GPIO.OUT)

# API endpoint (local web app)
API_URL = 'http://localhost:5173/api'

# Start with LED on
GPIO.output(LED_PIN, GPIO.HIGH)

def wire_touched(channel):
    # Turn on buzzer briefly
    GPIO.output(BUZZER_PIN, GPIO.HIGH)
    time.sleep(0.2)
    GPIO.output(BUZZER_PIN, GPIO.LOW)
    
    # Send error to web app
    try:
        requests.post(f"{API_URL}/error")
    except:
        print("Failed to send error to web app")

# Add event detection
GPIO.add_event_detect(WIRE_PIN, GPIO.FALLING, 
                     callback=wire_touched, bouncetime=300)

try:
    print("Buzz wire game hardware running...")
    while True:
        time.sleep(0.1)
        
except KeyboardInterrupt:
    print("Game stopped")
    
finally:
    GPIO.cleanup()
`}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center">
        <Button 
          onClick={handleBackClick}
          className="font-game"
        >
          Back to Game
        </Button>
      </div>
    </div>
  );
};

export default HardwareInstructions;
