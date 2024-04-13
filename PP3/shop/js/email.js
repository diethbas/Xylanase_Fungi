let getEmailHtml = (cart, cust) => {
    let cartCount = cart.length;
    let cartContent = '';
    let totalAmount = 0;
    cart.map((element) => {
        totalAmount += element.price * element.qty;
        cartContent += `
        
        <tr>
            <td class="w-50" style="font-size: 16px;">${element.name}</td>
            <td class="w-50 text-end" style="
                text-align: right;
                font-size: 16px;
            ">${element.qty} x PHP ${parseFloat(element.price).toFixed(2)}</td>
        </tr>
        `;
    });
    return `
    <html>
    <body style="
        font-family: sans-serif;
        font-size: 16px;
    ">
    <div style="
        max-width: 800px;
        margin: auto;
        font-family: sans-serif;
        margin-top: 20px;
    ">
        <p>Good day! Admin,</p>

        <p><b>${cust.firstName} ${cust.lastName}</b> is requresting for quotation here are the customer details:</p>
        <table style="
            margin-left: 30px;
        ">
            <tbody>
                <tr>
                    <td style="
                        font-weight: bold;
                    ">Email address:</td>
                    <td>${cust.email}</td>
                </tr>
                <tr>
                    <td style="
                        font-weight: bold;
                    ">Contact number:</td>
                    <td>${cust.contact}</td>
                </tr>
                <tr>
                    <td style="
                        font-weight: bold;
                    ">Deliver address:</td>
                    <td><a href="https://www.google.com/maps/search/?api=1&query=${cust.pos.lat}%2C${cust.pos.lng}">${cust.deladdress}</a></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="modal-content" style="
        border: 3px solid #D3B1C2;
        max-width: 800px;
        border-radius: 10px;
        overflow: hidden;
        margin: auto;
        margin-top: 30px;
        font-family: sans-serif;
    ">
        <div class="modal-header" style="
            display: flex;
            max-width: 100%;
            justify-content: space-between;
            padding: 10px;
            background-color: #D3B1C2;
        ">
            <img class="mdl-logo" src="https://diethbas.github.io/PP2/assets/image/logo.png" style="
                height: 32px;
            ">
            <div style="
                width: 50%;
                font-size: 11px;
                text-align: right;
                line-height: 18px;
            ">
                <div style="
                    width: 100%;
                    text-align: right;
                ">123 Main Street, Metro Manila, Philippines, Mycro Inc.</div>
                <div style="
                    width: 100%;
                    text-align: right;
                ">myrcro.customer.service@gmail.com | +6395314794236</div>
            </div>
        </div>
        <div class="modal-body" id="modalBody" style="
            max-width: 100%;
            padding: 10px;
        ">
            <div>
                <h4 style="
                    font-size: 18px;
                ">Order Qoutation:</h4>
                <h5 style="
                    font-size: 16px;
                ">Item(${cartCount})</h5>
            </div>
            <div class="mdl-content">
                <table class="table" style="
                    width: 100%;
                ">
                    <tbody>
                    ${cartContent}
                    </tbody>
                </table>
            </div>
            <div class="mdl-line"></div>
            <div class="mdl-gtotal">
                <table class="table" style="
                    width: 100%;
                    margin-top: 20px;
                    border-top: 2px solid #D3B1C2;
                    padding-top: 10px;
                ">
                    <tbody>
                    <tr>
                        <td class="w-50" style="
                            font-size: 20px;
                            font-weight: bold;
                        "> Total Price </td>
                        <td class="w-50  text-end" style="
                            text-align: right;
                            font-size: 20px;
                            font-weight: bold;
                        "> PHP ${parseFloat(totalAmount).toFixed(2)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </body>
    </html>
    `;
}