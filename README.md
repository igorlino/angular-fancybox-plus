[Angular FancyBox Plus](http://igorlino.github.io/angular-fancybox-plus/)
================================

[Angular FancyBox Plus](http://igorlino.github.io/angular-fancybox-plus/) is directive for the lightweight customizable lightbox [FancyBox plus](https://github.com/igorlino/fancybox-plus) plugin.

## Features

- Flexible Angular directive
- Can display images, HTML elements, SWF movies, Iframes and also Ajax requests
- Customizable through settings and CSS
- Groups related items and adds navigation.
- If the mouse wheel plugin is included in the page then FancyBox will respond to mouse wheel events as well
- Support fancy transitions by using easing plugin
- Adds a nice drop shadow under the zoomed item


## Installation

Via [Bower](http://bower.io/):

```bash
bower install angular-fancybox-plus
```

Via [npm](https://www.npmjs.com/):

```bash
npm install angular-fancybox-plus
```

In a browser:

```html
<script src="jquery.fancybox-plus.js"></script>
<script src="angular-fancybox-plus.js"></script>
```

## Getting Started

Include the FancyBoxPlus plug-in and the directive on a page.


Basic via attribute
```html
<a id="fbplus_01" href="path_to_image" fancyboxable>
```

Options via attribute
```html
<a id="fbplus_01" href="path_to_image" fancyboxable="{padding:30}">
```

Basic via tag
```html
<a id="fbplus_02" href="path_to_image" >
<fancybox box-for="fbplus_02" />
```

Options via tag
```html
<a id="fbplus_03" href="path_to_image" >
<fancybox box-for="fbplus_03"  options="{href:'images/large/image1.jpg', title:'A nice fancybox' }" />
```
For more information on how to setup and customise, [check the examples](http://igorlino.github.io/angular-fancybox-plus/).

## License
Licensed under MIT license.
