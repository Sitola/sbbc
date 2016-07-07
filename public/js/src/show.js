/**
 * Created by wermington on 7/7/16.
 */


const ShowList = {
    jsonCollection : function (item, data)
    {
        const selectItem = item;
        $.each(data, function(key, value){
            selectItem.append($('<option />', { value: key, text: value.name }));
        });
    }
}

