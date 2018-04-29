# Sunmedia slider

This is a very basic html slider that comes with a bunch of basic functionalities.


![Alt Text](/vendor/demo.gif)
# How to use

**We must import the slider plugin**
```javascript
  <script src="sm_slider.js"></script>
```

**Html structure**


```html
<div id="slider1" style="width:300px">
   <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
   </div>
   <div>
      <img src="https://picsum.photos/300/480/?image=2" alt="">
   </div>
   <div>
      <img src="https://picsum.photos/300/480/?image=3" alt="">
   </div>
</div>
```
**We initialize it**
```javascript
    const opts = {
      container: "slider1",
      nav: true,
      autoplay: false,
      loop: true,
      dots: true
    };
    var slider1 = new SMSlider(opts);
```

> Make sure you do **import the slider plugin** before starting the slider.

## Options

List including all options which are optional **except the container** argument.


| Option        | Description   | Type          | Default      |
| ------------- |---------------|---------------|--------------|
| autoplay     | Automtically plays the slider  |  Boolean      |        false |
| backgroundColor     | Sets a the background colour of each one of the slider slides.      |   String/Number         |        eff1f4 |
| border | Displays a border within default value between the slides. |    Boolean        |        false |
| container  | Html element that we want to target as our slider container.| String |   undefined |
| container     | Shows navigator.|         String |        undefined |
| currentSlide     | Sets the initial slide position where the portrait should be focusing.|  Number |        0 |
| direction     | Possible values 'vertical'/'horizontal'.  |  String      |  horizontal |
| dots     | Show dots navigation.  |  Boolean      |        true |
| navigator     | N/A |  Boolean      |        true |
| slidesInView     | The number of slides you want to see on slider portrait.|  Number      |        1 |
| swipeable     | Enables dragging events. |  Boolean      |        false |
| thumbnails     | Set of thumbnails that allow us to navigate. |  Boolean      |false |
| transitionTime     | N/A |  Number      |        2 |
| transitionFlow     | Possible values: 'ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out' |  String      |        ease |

## API

List of methods that the user will have access to.

displaySlide
> Displays a specific slide from the slider's stack

moveSlideBackward
> Moves slider to the previous slide position stack

moveSlideForward
> Moves slider to the next position slide stack
