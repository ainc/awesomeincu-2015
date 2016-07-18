---
layout: notes
title: Make A Pong Game With Unity 2D
course_link: /register/
---

# Let's Make: PONG

![Classic Pong screenshot](/img/tutorials/unity-pong/classic_pong_screenshot.png)

By Will Oldham

> Note: This tutorial was designed for Unity 4, and some features have changed for Unity 5.

Today, the name of the game is Pong. We're going to be using Unity3D v4.3 or later, MonoDevelop with the C# programming language, this tutorial, and a few stock images I've provided in a downloadable file. No prior knowledge in Unity or C# is required. I'm going to be working from a Mac, but that shouldn't affect anything until the very end of the project. The game is going to 2 Player - Unity can absolutely make a Computer opponent, but that's a little above our level for today. The only other thing we need is about 2 hours. 

Ready? It's gonna be awesome.

So, when we think about making pong, we might think of several simple mechanics that need to be created:

1. You have a Background to play on

2. You have a set of Paddles that go up and down

3. You have a ball that bounces off walls and paddles

4. You have a set of side walls that you hit to score

5. You have a score at which you win

6. You have a rage quit button (or reset button)

Seems easy enough. And it is, but maybe not as easy as it seems. We'll tackle each of these different goals, and we'll see just how far that gets us.

## Step One: The Setup

First, download this [Unity Pong assets file](https://s3.amazonaws.com/awesomeinc/unity-pong-assets.zip). It contains images and other assets that we'll be using in this tutorial.

Now, let's start with the paddles. When we open up Unity, we're used to seeing the camera hovering in 3D space. But that's not what we want today. Open up Unity and follow these steps:

1. File

2. New Project. You should see something like this:

![Unity's New Project window](/img/tutorials/unity-pong/new_project.png)

3. Name the Project something like 'Pong Game'

4. Make sure you select 2D from the dropdown menu that says 'Set up defaults for.' 3D Pong is a little ambitious for our first go, so 2D is a better choice.

You should now see the camera in a more 2D space. If you don't, in the Scene view in Unity, make sure the '2D' button is pressed along the top toolbar. Setting up Unity in 2D does several things. Objects that in 3D space would be farther away, just appear behind other objects in 2D. This view will also make it so that Unity defaults to Sprites instead of textures. Great! 

Remember that [Unity Pong assets file](https://s3.amazonaws.com/awesomeinc/unity-pong-assets.zip) that we downloaded? Now's a great time to unzip that file. You'll see a folder called `unitypong-assets`, which will contain a set of images, fonts, and other assets that we'll be using today. Select all, click, and drag these files into the Project pane at the bottom of your Unity window. They should end up in your Assets folder. If your Unity Editor window looks much different, then you may want to set your editor Layout to "Default".

![Downloaded assets](/img/tutorials/unity-pong/unitypong-assets.png)

The background image is going to be in your Assets folder as "Background.jpg". You can add and use another background image you want, but by doing this, you may have to adjust some size or view settings. You should see it in your Project pane:

![Background image selected in Project pane](/img/tutorials/unity-pong/background_project_pane.png)

Click on the image. The Inspector on the right side of your screen should look like this:

![Background image in Inspector pane](/img/tutorials/unity-pong/background_inspector.png)

Take some time to make sure your image is ready to be used. The only thing you should worry about here is Pixels to Units. Let's set it at 150, but changing that number is what affects how zoomed in or out from the background image it appears we are. Once you finish updating these settings, hit the Apply button. Then drag the image into the Hierarchy pane, just below `Main Camera`. It should appear in your Scene view, and be centered by default. If it's not centered, use the Inspector pane to make sure X and Y are 0. If this doesn't work, make sure you set that 2D perspective lock set in the menu bar above your Scene. Select your Background, now in the Hierarchy pane, and you should see it show up in the Inspector pane like this:

![image alt text](/img/tutorials/unity-pong/background_hierarchy_pane.png)

Look at the Inspector pane and the 'Sprite renderer' dropdown menu. We want to make sure the background actually renders behind our other sprites. Go to 'Sorting Layer', and add a new Sorting Layer called Background. Drag the new Background layer above the Default layer. You may need to re-select your Background object in the Hierarchy pane so that it will show up in the Inspector again. Your Inspector should look like this:

![Background image in Background Sorting layer](/img/tutorials/unity-pong/background_sorting_layer.png)

**REMEMBER: Always hit Apply when you finish in the Inspector for an object.**

Now we're cooking. Lets select the Main Camera object in your Hierarchy pane. Rename it so 'MainCamera' is one word. That will be important later in some of our scripting so that our code knows what object to look for. Next, make your camera settings look like mine, here to the left. All these settings are doing is getting the camera in the right position for the later pieces we'll be adding. The camera box won't exactly match with the Background, but that's fine - if the screen gets resized, we won't go past the background as quickly. The Scale options refer to how big a given object will be. The position refers to where it is on a graph - which is what your scene view is. Changing these numbers will change where the object is. The center is always 0,0,0.

![MainCamera properties](/img/tutorials/unity-pong/inspector_3.png)

## Step Two: The Paddles

The next obvious step is to make our paddles. Find the image called 'PongPaddle' in the Assests folder, within your Project pane. We shouldn't need to change anything here - just make sure that Texture Type is Sprite and the Pixels to Units is at 100, and we'll move on.

Now drag the paddle onto the scene in scene view. A 'Player' object should appear in your Hierarchy menu. Rename that to Player01. Cool. Click on that. Make it look like this under the inspector:

![image alt text](/img/tutorials/unity-pong/inspector_4.png)

All we're doing here is making sure that the paddle is positioned where we want it. You could position it wherever, but I found that for our settings, I like this location the best. The sorting layer and other settings don't matter this time because we want this object to be drawn on top, which is what Unity defaults to.

Next we're going to add two components to the Player object. Click on the 'Add Component' button, and then on 'Physics 2D.' Once you've done that add both a 'Box Collider 2D' and a 'Rigidbody 2D.' The Box Collider 2D is to make sure the ball will bounce off your paddle, and the Rigidbody 2D is there so we can move the paddle around. their menus should look like this:

![Physics - Box Collider 2D and Rigidbody 2D](/img/tutorials/unity-pong/player01_physics.png)

The mass is high because that will help to make sure the paddles don't move when the ball collides with them. Unity uses realistic physics, so when the ball hits, Unity wants to make the paddle absorb some energy and move back too. We don't want that. The Freeze Rotation (Z) helps make sure the paddles don't rotate when we move them either. The Box Collider 2D size is set so that it is the same shape as our paddle image. It's important to use Physics, BoxCollider, and RigidBody **2D** here because 3D versions of those exist - that's not what we want in our 2D game though. 

Now we want to do the hard part: add a Script for movement for our paddles. I'm going to share the code below. I recommend typing each line, some people may want to just copy the code and move on - totally depends on what you want to do. 

To add a script, make sure that Player01 is still selected in your Hierarchy pane, then go to 'Add Component', and then 'New Script.' Call this one 'PlayerControls' and make sure the language is C# (or CSharp, as it is spelled out in Unity). Hit 'Create and Add'. Now double click the icon that appears below in the Project pane to open it up in [MonoDevelop](http://en.wikipedia.org/wiki/MonoDevelop), Unity's Integrated Development Environment (or IDE) - essentially, it's the program Unity uses to let us write our scripts in. On Windows, you may be using Microsoft's Visual Studio IDE, but this process will be similar.

![image alt text](/img/tutorials/unity-pong/image_6.png)

This is what we need the file to look like:

### Code Breakdown: ###

In short, the first two lines are packages of pre-written code we want to tell our program it can use.

    using UnityEngine;
    using System.Collections;

The next line is the class name, the name of our file. It's the same thing that we named our Component.

	public class PlayerControls : MonoBehaviour {

the next couple of lines are variables, or objects the class should know about. By making these variables 'public,' we can adjust them through our Unity interface as well. If we have variables we don't want other developers to see in the Unity interface, we should call them 'private'. Unity may automatically add lines for a function called Start(), but we won't be using that, so you can delete that function.

The first two lines we add will denote the keys that we'll press to move the paddles, and the next one is the speed of the paddle, and the last one is a reference to our Rigidbody.

	public KeyCode moveUp = KeyCode.UpArrow;
    public KeyCode moveDown = KeyCode.DownArrow;
    public float speed = 10.0f;
    private Rigidbody2D rb2d;

Start is a function that is called when we first launch our game. We'll use it to do some initial setup, such as setting up our Rigidbody2D:

	void Start () {
        rb2d = GetComponent<Rigidbody2D>();
	}

Update is a function that is called once per frame. We'll use it to tell us what button is being pressed, and then move the paddle accordingly, or, if no button is pressed, keep the paddle still.

	void Update () {
        if (Input.GetKey(moveUp))
        {
            var vel = rb2d.velocity;
            vel.y = speed;
            rb2d.velocity = vel;
        } else if (Input.GetKey(moveDown))
        {
            var vel = rb2d.velocity;
            vel.y = -1 * speed;
            rb2d.velocity = vel;
        } else if (!Input.anyKey)
        {
            var vel = rb2d.velocity;
            vel.y = 0.0f;
            rb2d.velocity = vel;
        }
	}

The last bit of code should help keep the paddle still when the ball hits it - it's basically saying, after anything happens, put yourself back at the right x-coordinate. This is part of the 'Update()' function.

        var reset = rb2d.velocity;
        reset.x = 0;
        rb2d.velocity = reset;

*NOTE: Sometimes as we're writing code, our method (or function) names are important to keep the same, as they come from our packages. Make sure that you name methods the same thing that I do. For instance, an 'Update()' function is one that Unity knows to run once every frame, because it is called 'Update()'. If you want to / know how to play with how the methods accomplish what they do, you can do that. This doesn't apply to all methods, but be aware!*

Cool. Save that, and exit out. Now, when we go back to Unity, we should have a paddle that moves. Go to the 'Game' tab next to the 'Scene' tab, and hit the play button at the top of the screen. Use the up and down arrow keys. Does it work? Awesome! Go back to scene view, and click on our 'Player01' object. Under the Inspector pane, you should see a place to change the key bindings for up and down, and the speed that it moves at. Mess around with those as you please. The next step is to make a second paddle. All we need to do is right click 'Player01' in the Hierarchy menu, and choose Duplicate from the menu that appears when we right click. Rename it to be 'Player02'. Next, change its key bindings (I recommend using 'W' for up and 'S' for down), and move it to be the opposite location on the board - change the X value in Transform -> Position to be positive. Now go to 'Game' and test this one too. That work? AWESOME! You should have something that looks like this now:

![image alt text](/img/tutorials/unity-pong/image_12.png)

If so, move on - if not, go back and make sure you've done everything right. 

## Step Three: The Ball

You've made it to the Ball. Congrats! Things get more complicated from here on, and start to have a lot more code, so fasten your seatbelts, and remember, harder is funner (Let's just pretend that's a word)!

The first step is going to be finding the Ball image in the downloadable file, and dragging that into the Project view. Do that now. Drag it into the scene, same as our paddles and Background. Rename the object that now appears under the 'Hierarchy' menu to 'Ball,' and then head over to the Inspector to get the ball rolling. First, I've scaled down the size on the X and Y fields to .5. A smaller ball helps make the game not quite so awkward. Next we need to add similar components that we did to the paddle. Instead of adding 'BoxCollider 2D' we need to add 'Circle Collider 2D' and of course 'RigidBody 2D.' We don't need to change anything in the Circle Collider, except for adding a Material, so the ball will bounce. To do this, right click in the bottom Project pane, and create a new Physics2D material. Rename it 'BallBounce', and look at the Inspector. Change the friction value to 0, and the bounce factor to 1. That way our ball doesn't have friction from anything, including our paddles and wall. This means we control the speed of the ball from our script entirely. The bounciness factor means that it also doesn't lose any speed. It bounces back with the exact same speed it hit the object with. Select 'Ball' in the inspector. Drag 'BallBounce' to the 'Circle Collider 2D' box in the Inspector for 'Ball'. We also need to adjust a lot in 'Rigidbody 2D' so we can get pong ball behavior. It should look like this at the end:

![image alt text](/img/tutorials/unity-pong/image_13.png)

But of course, to actually get the Ball to move, we need a script. It's time to write our next one, this time called 'BallControl'. I'll do the same thing as before, and post the code with an explanation of what's happening:

### Code Breakdown:

**First, as always, we import our packages and name our file.**

![image alt text](/img/tutorials/unity-pong/image_14.png)

**In our 'Start()' function, we use the 'hi()' function to wait two seconds by using some code from the packages we imported into our file - this is to give people time to get ready before the ball starts.**

![image alt text](/img/tutorials/unity-pong/image_15.png)

**Then we make the ball start to move using the 'GoBall()' function. This function chooses a random direction to go.**

![image alt text](/img/tutorials/unity-pong/image_16.png)

**'resetBall()' and 'hasWon()' are two function used by other scripts which we will write later. In short, 'hasWon()' looks for a win condition and resets the ball.**

![image alt text](/img/tutorials/unity-pong/image_17.png)

**'resetBall()' is used when our reset button is pushed. We'll add that button later, but essentially it centers the ball on the board, and then tells it to start again.**

![image alt text](/img/tutorials/unity-pong/image_18.png)

**'OnCollisionEnter2D' waits until we collide with a paddle, then adjusts the velocity appropriately using both the speed of the ball and of the paddle.**

![image alt text](/img/tutorials/unity-pong/image_19.png)

Nifty swifty, neato spedito, our game is looking swell. Let's recap. We have two paddles that work, and now a ball that bounces around realistically. Does yours look like this in the Scene view, with a ball underneath the Camera symbol? The Game view should have just two paddles and a ball there, while the Scene view looks like this:

![image alt text](/img/tutorials/unity-pong/image_20.png)
So we're done right? Nope. You might have noticed I have something under the Hierarchy menu called HUD (or Heads Up Display) - this is what we need to write next.

## Step Four: The Walls

So you may have also noticed by now that your paddles can fly off the screen, and your ball can too. Really, you play a point, and then the game is over. Not the most fun thing in the world. So we need to make some walls. for this, we're going to first make an empty game object. To do this, go to 'GameObject' right next to 'File,' 'Edit,' and 'Assets.' Choose 'Create Empty'. Name it HUD (short for "Heads-Up Display") - it's what's going to contain our walls. We don't need to change anything except make sure that it's centered. We do need to write a really short script for HUD though. The script is just going to make the HUD be able to hold our wall objects. So add a new script to the HUD, and name it 'HUD'. This is what mine looks like:

### Code Breakdown:

We import our packages as usual, and then declare some variables. The first two will be for our paddles, the next four are for each of our four walls. This helps create a slot in the Inspector for the HUD for us to put each of these objects. 

![image alt text](/img/tutorials/unity-pong/image_21.png)
This also sets us up to get creative with the sizing of our game - if you want, you can try and figure out how to make the game resize using this script as you shrink or grow the game window. We're not going to write that today though as part of this tutorial, as that gets a little complicated to do.

Cool. Now lets save that and head back over to Unity. Go to the GameObject menu and Create Empty to make a new object. Call it 'rightWall.' Make sure you go to 'AddComponent' and add a Box Collider 2D - we want the walls to make the ball and paddles bounce off. Duplicate it three more times, and name each 'leftWall', 'botWall', and 'upWall.' You should have four walls now, each for a different direction. Under the Hierarchy menu, drag and drop those in the HUD variable, which should get a drop down arrow next to it. Click on Hud in the Hierarchy menu. You should see 6 new slots for objects. drag your walls and player objects into those slots from the Hierarchy menu. it should look like this at the end:

![image alt text](/img/tutorials/unity-pong/image_22.png)

Now we need to size those walls so they are in the right spot in our game view - right now, they're just points sitting in the middle of our board. We need to make them look like walls. To do this you have two options, one of which I'll be explaining. The first and harder option is to write in the HUD script some code in an 'Update()' function that keeps track of the size of the screen, and adjusts the wall sizes appropriately using the Box Collider 2D size and center. It wouldn't be too hard, but it's a little more than we need right now. We're just going to hard code in the right size. The "right size" depends on what your game is sized like. My top and bottom walls are Scaled to 13x1 (XxY) and centered at Position (0,3.5) and (0,-3.5). My right and left walls are Scaled to 1x6.4 (XxY) and centered at Position (5.9,0) and (-5.9,0). If it's sized like mine, it should look like this:

![image alt text](/img/tutorials/unity-pong/image_23.png)

Now comes an important, but slightly harder part. We need to make this an actual game, not just a ball bouncing around. We need a score system, a way to display the score, some win condition, and a reset button. That's right. It's time for….

**Continue….**

## Step Five: The Scoring User Interface

We need to make a script. A big one, relatively speaking. It's going to be attached to HUD, so click on HUD and add a new Script. Call it 'GameManager.' Awesome. GameManager is really important in terms of displaying the score, buttons, and resetting the game. I would HIGHLY RECOMMEND that you don't worry about the 'Score()' function at this point. It needs to be written after a piece of code we'll be writing after GameManager, but if you want to, you can write it now. It should look like this, 'Score()' function included:

### Code Breakdown:

**First, as always, we import our packages and declare our class.**

![image alt text](/img/tutorials/unity-pong/image_24.png)

**Next we make four variables. The first two variables are just integers to keep track of the scores for the two players. The next is a GUI object. 'GUI' stands for graphical user interface. This object is going to be responsible for displaying all our different buttons and graphics. We'll make this skin object in Unity after we finish here. The last object is so we can move our ball from this class.**

![image alt text](/img/tutorials/unity-pong/image_25.png)

**Then comes the 'Start()' function, which we use when the game first starts.**

![image alt text](/img/tutorials/unity-pong/image_26.png)

**Next is the 'Score()' function. It will get called by another script we write in just a minute, that detects when the ball hits the side walls.**

![image alt text](/img/tutorials/unity-pong/image_27.png)

**The OnGUI() function takes care of displaying the score and the reset button functionality. Then, it checks every time something happens if someone has won yet, and triggers the function 'hasWon()' if someone has.**

![image alt text](/img/tutorials/unity-pong/image_28.png)

![image alt text](/img/tutorials/unity-pong/image_29.png)

**The 'SendMessage' call is something we've been using a lot in this chunk of code - it will trigger any function that matches the name that we send it in a class we specify. So when we say theBall.gameObject.SendMessage("hasWon"), we tell the program to access the 'BallControl' class and trigger the “hasWon” method.**

Ok cool. Looking at the HUD, we now see there's one new variable under this script that needs filling. It's asking for a 'Skin.' We need to make that in Unity. If you look in the downloadable file, you should see a file that has a special font in it called '6809 Chargen.' 

***NOTE : This font pack is also available for free in the 'Computer Font Pack' off the Unity Asset Store. To get it, simply make a free Unity3D account, and go to the Asset Store. Search for the Computer Font Pack, and download it. You can also go into Unity and open up the Asset Store from inside Unity. There, you can download the fonts you want directly into Unity for your use. This font isn't essential to use, but I'll explain how to use it, because it gives the text the right 'Pong' look.***

First, drag and drop that file into the Project pane. Right click on the Project pane, and create a GUI Skin. Click on that Skin, and you should see a variable field at the top of the Inspector pane. Drag our font to that variable slot. If you scroll down and look under the dropdown menu 'TextField' you can also change the size of your text, etc. Play around with size until it looks good. In the end, mine looks like this:

![image alt text](/img/tutorials/unity-pong/image_30.png)

Awesome! Now you should, when you play, see something like this:

![image alt text](/img/tutorials/unity-pong/image_31.png)

Cool. Now let's make sure that the game knows when we do score. To do that, we need to add a script to the 'rightWall' and 'leftWall' object under the HUD dropdown. It's the same script so it should  be pretty easy to do. It should look like this:

**CODE BREAKDOWN:**

**After we import our packages, we just need to write one function. This function detects when something is colliding with our left or right walls. If it's the ball, we call the score method in GameManager, and reset the ball to the middle. That's about it really. Huh. That was easy.**

![image alt text](/img/tutorials/unity-pong/image_32.png)

***NOTE: if you skipped writing the 'Score()' function before, go back and write it NOW.***

You already added the script to one of the two, and now, since it's written, go to 'Add Component' on the other one and choose just 'Script' instead of 'New Script.' Choose the Script we just wrote. Now, both of your walls should trigger the score. Make sure your Left and Right walls have "Is Trigger" checkbox selected on the Box Collider in the Inspector pane. Do they? AWESOME!

Know what that means?

We're DONE! Almost.

## Last Step: Make The Game

Now, we only have to make our game playable outside of unity. To do this, go to File at the top of Unity. Go to 'Build Settings' and then choose 'Mac, PC, Linux Standalone.' This will make an executable (playable) file appear on our desktop. Now, click on 'Player Settings.' This is where you should put your name on the Project, choose an icon (I chose the Ball sprite), and set the default screen size to 1152x720. This is what looks best for our settings. You can play with it some, but it might start to look a little wonky if we play with it too much. We also don't want to make the game fullscreen - there's just no need. Your settings in the end should look like this:

![image alt text](/img/tutorials/unity-pong/image_33.png)

Now, choose where you want to save the file (I chose the desktop), and name it something (I named it Pong v1.0). Look at your desktop. Is it there? Sweet. If you want to see my completed version, here's the [sample code on GitHub](https://github.com/ainc/unity-pong).

Congratulations, and enjoy your game. Thanks for going through this tutorial, and if you want to learn more about Unity or coding in general, make sure to check out the rest of [Awesome Inc U](http://www.awesomeincu.com/) online. 

## THANKS, AND GAME ON.

 ![image alt text](/img/tutorials/unity-pong/image_34.png)

