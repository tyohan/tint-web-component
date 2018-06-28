export default class TintComponent extends HTMLElement {
    /**
     * Return object of properties
     */
    static get properties(){
        return {};
    }

    /**
     * 
     * return properties that will observed as attribute
     */
    static get observedAttributes() {
        let observed=[];
        for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
                const prop = this.properties[key];
                if(prop!==null && typeof prop ==='object' && prop.hasOwnProperty('isAttribute') && prop.isAttribute===true){
                    observed.push(key);
                }
            }
        }
        return observed;
    }

    /**
     * Mapping properties to element attributes
     * @param {object} properties - list of properties that set from this.constructor.properties
     */
    mapAttributes(properties){
        for (const key in properties) {
            if (properties.hasOwnProperty(key)) {
                const prop = properties[key];
                if(prop!==null && typeof prop==='object'){
                    
                    if(prop.hasOwnProperty('isAttribute') && prop.isAttribute===true){
                        let attr=this.getAttribute(key);
                        if(attr!==null){
                            if(attr===''){
                                attr=true;
                            }

                            this._attributes[key]=attr;
                            if(prop.hasOwnProperty('value')){
                                prop.value=attr;
                            } else {
                                prop=attr;
                            }
                        } else {
                            if(prop.hasOwnProperty('value')){
                                this._attributes[key]=prop.value;
                            } else {
                                this._attributes[key]=null;
                            }  
                        }
                        

                        if( this._attributes[key]!== null && this._attributes[key]!==false){
                            const attrValue=this._attributes[key]===true?'':this._attributes[key];
                            this.setAttribute(key, attrValue);
                        } 

                        this._properties[key]=prop;
                    } 
                } 
                
                if(typeof this._properties[key]==='undefined'){
                    if(typeof prop==='undefined') {
                        prop = null;
                    }
                        
                    this._properties[key]=prop;
                }

                Object.defineProperty(this, key, { 
                    get: function() { 
                        if(this._properties[key]!==null && typeof this._properties[key]==='object' && this._properties[key].hasOwnProperty('value')){
                            return this._properties[key].value;
                        } else
                            return this._properties[key]; 
                    },
                    set: function(newValue) { 
                        const oldValue=this._properties[key];
                        const properties=this.constructor.properties;
                        
                        //check if there is an observer
                        if(properties[key]!== null && typeof properties[key]==='object'){
                            
                            if(properties[key].hasOwnProperty('observer')){
                               this.triggerObserver( properties[key], oldValue.value,newValue);
                                
                            }
                            //update object property value;
                            this._properties[key].value=newValue;
                        } else {
                            //update property value;
                            this._properties[key]=newValue;
                        }
                        
                        
                        //make sure update attribute if exist
                        if(this._attributes.hasOwnProperty(key)){
                            if(typeof newValue === 'boolean'){
                                if(newValue){
                                    this.setAttribute(key, '');
                                } else if(this.hasAttribute(key)){
                                    this.removeAttribute(key);
                                }
                            } else {
                                this.setAttribute(key, newValue);
                            }
                            this._attributes[key]=newValue;
                        } 

                        this._updateRendering();
                    }
                });
            }
        }
    }

    triggerObserver(prop,oldValue,newValue){
        if(typeof prop.observer==='function'){
            //call observer if set
            // need to check
           prop.observer(oldValue,newValue);
        }
        else if(typeof prop.observer==='string'){
            this[prop.observer](oldValue,newValue);
        }
    }
    /**
     * 
     * @param {string} name 
     * @param {mix} oldValue - previous value of changed attribute
     * @param {mix} newValue - new value of changed attribute
     */
    async attributeChangedCallback(name, oldValue, newValue) {
        const value=newValue===''?true:newValue;
        if(typeof this._properties[name]==='object'){
            this._properties[name].value=value;
        } else {
            this._properties[name]=value;
        }
        
        if(this._properties[name].hasOwnProperty('observer')){
            this.triggerObserver(this._properties[name],oldValue,value)
        }
        this._attributes[name]=value;
        this._updateRendering();
    }

    render(){
        this.$.innerHTML = this.getTemplate();
    }

    getTemplate(){
        return ``;
    }

    constructor() {
        super(); // always call super() first in the ctor.
        this._onRendering=false;
        this._ready=false;
        this._attributes={};
        this._properties={};
        // Attach a shadow root to <custom-element>.
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.$=this._shadowRoot;
      }
    
    /**
     * internal function to update rendering and call ready() on element first created
     * The rendering bind to requestAnimationFrame so don't expect it will updated realtime
     */
    async _updateRendering(){
        if(!this._onRendering){
            window.requestAnimationFrame(()=>{
                this._onRendering=true;
                //use lithtml to render the template inside shadow dom
                this.render();
                this._onRendering=false;
                if(this._ready===false){
                    this.ready();
                    this._ready=true;
                }
                
            });
        } 
    }

    /**
     * Callback function that called once element connected to parent element
     */
    connectedCallback(){
        this.mapAttributes(this.constructor.properties); //mapping attribtues after it's connected to parent
        this._updateRendering();
    }

    /**
     * Callback function that called once element connected to parent and templated finish rendered. 
     * Extend this function to setup anything with your element
     */
    ready(){
        // update here for anything need after rendered.
    }
    
  }