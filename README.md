# TintJS Web Component Library
The TintJS is my experiment library to play with Web Component. Most API designed inspired from Polymer, a tiny library from Google to make you easier build web component. 

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

In theory you can access all the properties using `this.<property-name>` and any change to property will automatically call this.render() to update the view. It use `window.requestAnimationFrame()` to render the view to make sure it efficiently rendered.

## Property

You can declared a complex property like this:
```
 static get properties(){
        return {
            title:{
                type:String,
                value:'This is the title',
                isAttribute:true, //will reflect to attribute so you can change the property from element attribute
                observer:'_titleUpdated' // automatically called _titleUpdated() function when the value changed
            }
        };
 }
```