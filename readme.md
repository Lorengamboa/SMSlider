# SMSlider

This is a very basic html slider that comes with a bunch of basic functionalities.


![Alt Text](/vendor/preview.gif)
# How to use

**We must import the slider plugin**
```html
  <script src="sm_slider.js"></script>
```

**Html structure**


```html
<div id="slider1" style="width:300px; height:480px">
   <div style="font-family: 'Inconsolata'; padding: 5px ">
     <img src="https://orig00.deviantart.net/9517/f/2017/261/9/f/fortnite___icon_by_blagoicons-dbnu8a0.png" alt="">
      <p>Fortnite is a co-op sandbox survival game developed by Epic Games and People Can Fly and published by Epic Games.</p>
   </div>
   <div>
      <img src="https://dotesports-cdn-prod-tqgiyve.stackpathdns.com/thumbor/h3VXIF_74X7PUONW1O_dhSgxIos=/900x0/filters:no_upscale()/https://dotesports-cdn-prod-tqgiyve.stackpathdns.com/article/ce1048af-f5ae-494e-9fb4-fbb8b3416fce.png" alt="">
   </div>
   <div>
      <img src="https://assets.stormshield.one/T-Icon-Weapons-SK-RPG7-L.png" alt="">
   </div>
   <div>
      <img src="https://vignette.wikia.nocookie.net/fortnite/images/2/27/Icon_Weapons_SK_Hydra_L.png/revision/latest?cb=20170806003216" alt="">
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

stopAutoplay
> Stops autoplay

playAutoplay
> Plays autoplay
