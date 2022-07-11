# canvyu

Canvyu is the javascript based gesture detection code for touch/pen display

### Technologies used
- Html
- Javascript

### Library used
- [Tesseract](https://tesseract.projectnaptha.com/) - Used to identify text from Image based on given language.


### Features
- Text Identification
- Number Identification
- Incremental number
- Gesture list selection

&nbsp;
##### Text Identification :
It will identify text from given gesture draw by user and apply filter on list item.

&nbsp;
##### Number Identification :
It will identify number from given gesture draw by user and fill that number to input.

&nbsp;
##### Incremental number :
It will increase or decrease the value of number input based on dragging the up and down arrow.

&nbsp;
##### Gesture list selection :
It is used to select items from the list by touch or dragging over the item in the list.

&nbsp;
### Workflow / How it's works

Here is the simple steps of how the gesture thing work

- 1] Have use html canvas for user to draw character or number on it.
- 2] After drawing on it, we can have the image of that canvas in base64 format.
- 3] The library(Tesseract) that help to identify the character in drawing.
- 4] Now we have the character to do events with it.

&nbsp;

Here is the simple steps of how the number incremental works
- It is basic javascript functionality that allow us set mouseDown and mouseUp events on any element. So i have set two element "up arrow" and "down arrow" and set mouse event to them.
- Calculated distance between the element's initial position and current position and keep increase/decrease value of input based on dragging distance

&nbsp;

Here is the simple steps of how the Gesture list selection works
- As I already mentioned in above points, Just set events on the main window for mouse up/down and keep selecting items in list on hover of it when mouse/pen is being tap.