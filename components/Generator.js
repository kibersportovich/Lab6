class Component {
    constructor(data) {
        this.data = data;
    }

    _setOptions(component, options) {
        if (!options) return;
        Object.keys(options).forEach(option => {
            if (option === 'className') {
                component.className = options[option];
            } else {
                component[option] = options[option];
            }
        });
    }

    _setChildren(component, children) {
        if (!children) return;
        children.forEach(child => {
            if (typeof child === 'string') {
                component.appendChild(document.createTextNode(child));
            } else {
                component.appendChild(new Component(child).render());
            }
        });
    }

    _setListeners(component, listeners) {
        if (!listeners) return;
        Object.keys(listeners).forEach(trigger => {
            component.addEventListener(trigger, listeners[trigger]);
        });
    }

    render(parent = null) {
        const { tag, options, children, listeners } = this.data;

        const component = document.createElement(tag);
        
        if (options) this._setOptions(component, options);
        if (children) this._setChildren(component, children);
        if (listeners) this._setListeners(component, listeners);

        if (parent) {
            parent.appendChild(component);
        }

        return component;
    }
}

export default Component;