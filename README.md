# Neural Network Car Game

Welcome to the Neural Network Car Game! In this game, you'll be teaching cars to navigate through traffic using neural networks. Let's dive into how to play:

## Game Controls:
- **Max Speed:** Set the maximum speed for the cars. This determines how fast the cars can move.
- **Number of Cars:** Choose the number of cars in the simulation. We recommend starting with 100 cars for optimal performance. The more cars you use, the better your chances are of finding the ideal one.
- **Brain Mutation:** Adjust the mutation rate of the car brains. This determines how much the brains of the cars mutate from the current best car. Increase or decrease to adjust the randomness of your cars brains.
- **Restart:** Press the "Restart" button to start a new run with the selected input values (or default values if none selected).
- **Save:** Save the best car from the current run. This car's brain will be used as the starting point for the next run.
- **Delete:** Delete the saved car and start fresh with a new run.
- **Benchmark:** Test the saved car's performance by recording the highest distance it achieves.

## Game Objective:
The goal of the game is to teach cars to avoid traffic for as long as possible. Each run ends when a car hits the traffic or goes outside the road. Your challenge is to optimize the car's behavior using neural networks to achieve the highest distance possible.

## Game Mechanics:
- **Starting a New Run:** Press the "Restart" button to start a new run with the selected input values. The simulation will begin with the specified number of cars, each controlled by a neural network.
- **Highlighting the Best Car:** During the simulation, the game will highlight the "best car," which is the car that has traveled the farthest distance without crashing into traffic or going off the road.
- **Saving the Best Car:** If you're satisfied with the performance of the best car, press the "Save" button to store its brain for the next run. This car's brain will serve as the starting point for the next run, allowing for further optimization. Sometimes you have to be quick to Save the car you want.
- **Deleting the Saved Car:** If you want to start fresh without using the saved car's brain, press the "Delete" button to remove it from the storage.
- **Benchmarking Performance:** Use the "Benchmark" button to test the saved car's performance. The game will record the highest distance achieved by the saved car, providing valuable insights into its capabilities.

## About the Neural Network:
The neural network in this game comprises several layers that process inputs from sensors installed in the cars. These sensors detect the environment around the car, including traffic and road boundaries.

- The bottom layer of the neural network illustrates the inputs as yellow circles, representing the sensors.
- Each sensor detects objects in its vicinity, with transparency indicating no detection and intensity increasing based on the proximity of objects.

- The middle layer represents the biases of the neural network.
- These biases help adjust the network's calculations and decision-making process.

- The top layer of the neural network represents the outputs, which control the car's movement.
- These outputs determine actions such moving forward, reverse, turning left or right.

By adjusting the input values and mutation rate, you can optimize the neural network's performance and teach the cars to navigate more effectively.

## Tips for Success:
- Experiment with different combinations of input values to find the optimal settings for your cars.
- Pay attention to the behavior of the best car and adjust the mutation rate accordingly to encourage further improvement. Increase the mutation if the cars are not "improving" or decrease the mutation if you are happy with how your car is performing.
- Keep practicing and refining your strategies to achieve the highest distances in each run.

That's it! You're now ready to dive into the Neural Network Car Game. Have fun and happy teaching!

## This game was built by following along with [Radu](https://www.youtube.com/@Radu)'s Self-Driving-Car project and modifying it to be more interactive. Highly recommend watching it if you're interested in learning how Neural Networks work.

![alt text](<Screenshot from 2024-04-10 14-21-16.png>)
![alt text](<Screenshot from 2024-04-10 14-21-51.png>)
![alt text](self-driving-car-02.gif)
![alt text](self-driving-car.gif)