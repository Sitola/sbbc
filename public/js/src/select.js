/**
 * Created by wermington on 7/8/16.
 */


class SelectComponent {
    constructor(componentName, type, parent)
    {
        this.componentName = componentName;
        if (parent) {
            this.component = SelectComponent.createComponent(componentName, parent);
        } else {
            this.component = SelectComponent.bindComponent(componentName);
        }
        this.type = type;
        this.fillCallback = function () {};
    }


    clean()
    {
        this.component.empty();
    }

    static bindComponent(componentName)
    {
        return $(componentName);
    }

    select(id)
    {
        console.log("Selecting: %s for component [%s]", id, this.componentName);
        this.component.val(id).change();
    }

    getSelectedId()
    {
        return this.component.val();
    }

    getContent(callback)
    {
        this.clean();
        const _this = this;
        const resp = Manager.getCollection(this.type + "s");
        resp.handle( (result) => {
                ShowList.jsonCollection(_this.component, result);
                if (typeof callback == "function") {
                    callback(result);
                }
            });
    }

    listen(fillCallback)
    {
        const _this = this;
        this.fillCallback = fillCallback;
        _this.filler(fillCallback);
        _this.refresh(fillCallback);
    }

    refresh(callback)
    {
        const _this = this;
        callback = callback || this.fillCallback;
        this.getContent(
            function ()
            {
                const selectedId = _this.getSelectedId();
                _this.receiveObject(selectedId, callback);
            });
    }

    receiveObject(id, callback)
    {
        callback = callback || this.fillCallback;
        console.log("Selected item \"%s\" from [%s]", id, this.type);
        var resp = Manager.getObject(this.type, id);
        resp.handle(callback);
    }

    static createComponent(componentName, parent)
    {
        const comp = $(`<select id="${componentName}" class="selectComponent" />`);
        parent.append(comp);
        console.log("Created component: ", comp);
        return comp;
    }


    check(callback)
    {
        const _this = this;
        callback = callback || this.fillCallback;
        this.component.on('change', function ()
        {
            const id = $(this).val();
            _this.receiveObject(id, callback);
        });
    }

    filler(callback)
    {
        callback = callback || this.fillCallback;
        this.check(callback);
    }
}


const SelectHelper = {
    onChange: function (id)
    {
        "use strict";
        console.log("Selected id: %s", id);
    },

    check: function (component, callback)
    {
        callback = callback || SelectHelper.onChange;
        component.on('change', function ()
        {
            const id = $(this).val();
            callback(id, this);
        });
    },

    filler: function (component, type, callback)
    {
        function intern_call(id)
        {
            console.log("Selected item \"%s\" from [%s]", id, type);
            var resp = Manager.getObject(type, id);
            resp.handle(callback);
        }

        SelectHelper.check(component, intern_call)

    },

    getSelectedId: function (component)
    {
        return component.val();
    },

    selectId: function (component, id)
    {
        component.val(id);
    }

};

