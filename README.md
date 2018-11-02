# Trainschedule

Using Firebase, html, css, javacript

A table of presubmitted trains show their name, destination, Frequency in minutes, Next Arrival time, Minutes away

Below that is a form that contains input lines and a submit button, allowing user to add trains to the table and at the same time saving them to the firebase database

The Minutes Away column value is decrementing as time elapses until the Arrival time is reached and then the Minutes Away resets back to max and begins to decrement again

The Next Arrival times are based off the Frequency of the specific train. Once the Next Arrival time is reached, it is updated to next train arrival based off the frequency value

