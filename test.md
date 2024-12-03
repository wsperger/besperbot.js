### Extracting Base URL and Flow URL Construction

In Liquid templates, you can use filters and string manipulations to extract parts of a URL. Below are the steps and relevant Liquid code snippets for obtaining the base URL and constructing a complete API endpoint URL.

#### 1. Extract Base URL

To get the base URL from a request, you can split it by the `request.path` to isolate the domain. Here is how you do it with Liquid:

```liquid
{% assign baseurl = request.url | split: request.path | first %}
```

- **`request.url`**: This gives you the full URL of the current request.
- **`split: request.path`**: Splits the full URL using the current path.
- **`first`**: Gets the first part of the split URL, which corresponds to the base URL.

#### 2. Fetch Designer Update Endpoint

You will need to execute a Liquid FetchXML query to obtain the update endpoint value from a Dynamics entity:

```liquid
{% fetchxml update_endpoint_fetch %}
<fetch top="1">
    <entity name="bsp_powerpage_enviroment_variable">
        <attribute name="bsp_value" />
        <filter>
            <condition attribute="bsp_name" operator="eq" value="designer_update_endpoint" />
        </filter>
    </entity>
</fetch>
{% endfetchxml %}

{% assign update_endpoint_record = update_endpoint_fetch.results.entities[0] %}
{% assign update_endpoint_url = update_endpoint_record.bsp_value %}
```

- **`fetchxml`**: Used to execute a query to your Dynamics CRM database.
- **`update_endpoint_fetch`**: Holds the results from the FetchXML query.
- **`update_endpoint_url`**: Extracts the endpoint URL from the queried record.

#### 3. Construct the Complete Flow URL

Once you have the base URL and the specific endpoint URL, concatenate them to form the complete URL for API calls:

```liquid
{% assign flowUrl = baseurl | append: update_endpoint_url %}
```

### API Call Format

After calculating the `flowUrl`, you can use JavaScript to perform API requests. Here’s a simple example format for making a POST request:

```javascript
fetch(flowUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        // Your payload data here
    })
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);
});
```

- **`fetch(flowUrl, {...})`**: Utilizes the `Fetch API` to make HTTP requests.
- **`method: 'POST'`**: Specifies the HTTP method.
- **`headers: { 'Content-Type': 'application/json' }`**: Sets the request's content type.
- **`body: JSON.stringify(...)`**: Sends the request payload as JSON.

### Summary

- Use Liquid to compute `baseurl` and `flowUrl`.
- Use JavaScript Fetch API to perform the HTTP requests using the URLs computed in Liquid.
- Ensure structured payload and appropriate error handling using promises in JavaScript.S