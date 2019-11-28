# RESTful app

This is a demonstration project. It doesn't intend to deliver any final product.
Purpose is to deliver an MVP built on MEAN stack.

## MongoDB and Mongoose

This project uses MongoDB Atlas client and therefore Mongoose JavaScript library
in order to accomplish a database connection. Therefore, you need to create
an `.env` file in the root folder (which is ignored in `.gitignore`) and append
  * __`DB_CONNECTION`__ => _your database connection string_

  and

  * __`DB_CONNECTED_MSG`__ => _your custom connected to database message (shown in console)_
  
## Constants

<dl>
<dt><a href="#hideNotification">hideNotification</a> ⇒ <code>Object</code></dt>
<dd><p>Hide notification.</p>
</dd>
<dt><a href="#showNotification">showNotification</a> ⇒ <code>Object</code></dt>
<dd><p>Show notification.</p>
</dd>
</dl>

<a name="hideNotification"></a>

## hideNotification ⇒ <code>Object</code>
Hide notification.

**Kind**: global constant  
**Returns**: <code>Object</code> - An object with `data`, `context and `type` props and `isRegistered`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | a unique identifier for your notification Defaults to `1500` for video `context` or `3000` otherwise. |
| [context] | <code>String</code> | <code>NOTIFICATION_CONTEXTS</code> | Context of the notification popup. One of `PAGE` or `VIDEO_STREAM` options. It determines the popups location. |

<a name="showNotification"></a>

## showNotification ⇒ <code>Object</code>
Show notification.

**Kind**: global constant  
**Returns**: <code>Object</code> - An object with `data`, `context and `type` props.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data.customIcon] | <code>String</code> |  | A custom HTML string that represents the icon of the notification header. |
| [data.header] | <code>String</code> |  | notification header |
| [data.id] | <code>String</code> |  | a unique identifier for your notification |
| [data.message] | <code>String</code> |  | notification message |
| [data.showClose] | <code>Boolean</code> |  | State ofthe close button. Defaults to `false` otherwise if explicitly set to `true` will force the render of close the button. |
| [data.timeout] | <code>Number</code> |  | Explicit given timeout number. |
| [data.id] | <code>String</code> |  | a unique identifier for your notification Defaults to `1500` for video `context` or `3000` otherwise. |
| [context] | <code>String</code> | <code>NOTIFICATION_CONTEXTS</code> | Context of the notification popup. One of `PAGE` or `VIDEO_STREAM` options. It determines the popups location. |
