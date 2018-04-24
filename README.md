# TintJS Web Component Library
The TintJS is my experiment library to play with Web Component. Most API was designed using some references from Polymer and LitHTML, the libraries from Google to make you easier build web component. The abstraction goal is less repetition on creating the web component especially to keep sync between the properties (mostly devs call it states) and the DOM. 

# How To Use
Basically this is an abstraction from HTMLElement that help you write your own custom element. It's not come with rendering function like VDOM or LitHTML, so you can use any library to render efficiently the DOM. Below is an example how to use it with LitHTML to render inside shadowDom

```
import TintComponent from '../src/tint-component.js';
import {render,html} from '../node_modules/lit-html/lit-html.js'; 
export class TintApp extends TintComponent {
    static get properties(){
        return {
            title:'Example of Component',
            content:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
        }
    }
    
    render(){
        render(this.getTemplate(),this._shadowRoot);
    }

    getTemplate(){
        return html`
        <h1>${this.title}</h1>
        <article>${this.content}</article>
        `;
    }

    ready(){
        //do anything here like DOM manipulation
    }
}
customElements.define('tint-app',TintApp);

```

In theory you can access all the properties using `this.<property-name>` and any change to property will automatically call `this.render()` to update the view. It use `window.requestAnimationFrame()` to render the view and make sure it efficiently rendered.

## Properties

For element properties You can declared a complex property like this:
```
 static get properties(){
        return {
            header:{
                type:String,
                value:'This is the header',
                isAttribute:true, //will reflect to attribute so you can change the property from element attribute
                observer:'_titleUpdated' // automatically called _titleUpdated() function when the value changed
            }
        };
 }
```
If you set `isAttribute:true` in a property, the property will reflect to an element as element attribute. So you can access it from outside like `<your-element header=""></your-element>`. Any change to attribute will update the property and also rerender the shadowDOM.

If you declare an observer in a property, it will automatically called when the property value changed.

Then after construction, you can acccess them through element instance like `this.<property-name>` for example following the declaration above, you can access the property with `this.title` and `this.content`.

## Methods
Some important public methods you can use

### `this.render()`
You need to extend this function whenever you want to create your element. You can use any rendering library like LitHTML or HyperHTML. 

### `this.ready()`
This method will called once the element is ready and first render already done. So you can do anything with element like DOM manipulation, or API call and update the properties.