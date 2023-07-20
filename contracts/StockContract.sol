// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract StockContract {
    address public owner;
    mapping(address => bool) public manufacturers;
    mapping(address => bool) public dealers;    
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowance;
    string public ename;
    string public symbol;
    uint8 public decimals;

   event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event OwnershipTransferred(uint indexed productId, address indexed from, address indexed to);


    
   constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        owner = msg.sender;
        ename = _name;
        symbol = _symbol;
        decimals = _decimals;
        balances[owner] = 1000000 * 10 ** uint256(decimals); // set initial supply to 1 million
        emit Transfer(address(0), owner, balances[owner]);

    }



    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action.");
        _;
    }

    modifier onlyManufacturer() {
        require(manufacturers[msg.sender], "Only manufacturer can perform this action.");
        _;
    }

    modifier onlyDealer() {
    require(dealers[msg.sender], "Only dealer can perform this action.");
    _;
}


  function mintin(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Invalid recipient address.");
        require(amount > 0, "Amount must be greater than 0.");
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function mint(uint256 amount, address manuaddress) public onlyOwner  {
        balances[manuaddress] += amount;
        emit Transfer(msg.sender, manuaddress, amount);
    }



function getOwner() public view returns (address) {
    return owner;
}

 function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }



    function addManufacturer(address manufacturer) public onlyOwner {
        manufacturers[manufacturer] = true;
    }

     function addDealer(address dealer, uint256 amount) public onlyManufacturer {
    require(amount > 0, "Amount must be greater than 0.");
    require(balances[msg.sender] >= amount, "Insufficient balance.");
    balances[msg.sender] -= amount;
    balances[address(this)] += amount;
    dealers[dealer] = true;
}



function transfer(address to, uint256 value) public returns (bool) {
    require(to != address(0), "Invalid recipient address.");
    require(value > 0, "Amount must be greater than 0.");
    require(value <= balances[msg.sender], "Insufficient balance.");
    require(manufacturers[msg.sender] || msg.sender == owner, "Only manufacturer or owner can transfer tokens.");
    
    uint256 transferAmount = value;
    
    if (to != owner && !manufacturers[to] && !dealers[to]) {
        balances[owner] += (value - transferAmount); 
        emit Transfer(msg.sender, owner, (value - transferAmount));
    }
    
    balances[msg.sender] -= transferAmount;
    balances[to] += transferAmount;
    
    emit Transfer(msg.sender, to, transferAmount);
    
    return true;
}

uint256 public _counter;

struct Product {
    string name; //0
    string model; //1
    string dealer; //2
    string serialNumber; //3
    string warranty; //4
    bool sold; //5
    string customerName; //6
    string customerEmail; //7
    string salesDate; //8
        string manufacture;

}

    Product[] public products;
mapping(uint256 => Product) public productDetails;
    mapping(string => uint) public serialNumberToIndex;
    mapping(string => string) public serialNumberToCustomer; 
    


function showProduct(string memory _name, string memory _model, string memory _dealer, string memory _serialNumber, string memory _warranty, bool _sold, string memory _customername, string memory _customeremail,string memory _salesdate,string memory _manufacture) public {
    productDetails[_counter] = Product(
        _name,
        _model,
        _dealer,
        _serialNumber,
          _warranty,
        _sold,
        _customername,
        _customeremail,
        _salesdate,
                _manufacture

      
    );
    _counter = _counter + 1;
}

function getProducts() public view returns (Product[] memory) {
    return products;
}

function addProduct(string memory name, string memory model, string memory dealer, string memory serialNumber,string memory warranty, uint256 amount,string memory manufacture) public onlyManufacturer {
    require(serialNumberToIndex[serialNumber] == 0, "Product with this serial number already exists.");
    require(amount > 0, "Amount must be greater than 0.");
    require(balances[msg.sender] >= amount, "Insufficient balance.");
    balances[msg.sender] -= amount;
    balances[address(this)] += amount;
    Product memory newProduct = Product(name, model, dealer, serialNumber,warranty,false, "","","0",manufacture); 
    products.push(newProduct);
    serialNumberToIndex[serialNumber] = products.length;
    emit Transfer(msg.sender, address(this), amount);
}

function getProductsByManufacture(string memory manufacture) public view onlyManufacturer returns (Product[] memory) {
    uint256 count = 0;
    for (uint256 i = 0; i < products.length; i++) {
        if (keccak256(bytes(products[i].manufacture)) == keccak256(bytes(manufacture))) {
            count++;
        }
    }
    Product[] memory result = new Product[](count);
    uint256 index = 0;
    for (uint256 i = 0; i < products.length; i++) {
        if (keccak256(bytes(products[i].manufacture)) == keccak256(bytes(manufacture))) {
            result[index] = products[i];
            index++;
        }
    }
    return result;
}



    function updateCustomerDetails(string memory serialNumber, string memory customerName, string memory customerEmail) public {
    uint index = serialNumberToIndex[serialNumber];
    require(index != 0, "Product with this serial number does not exist.");
    Product storage product = products[index - 1];
    require(product.sold == true, "Product is not yet sold.");
    product.customerName = customerName;
    product.customerEmail = customerEmail;
}

    
    function getProductBySerialNumber(string memory serialNumber) public view returns (string memory, string memory, string memory, string memory, bool, string memory,string memory,string memory,string memory) {
        uint index = serialNumberToIndex[serialNumber];
        require(index != 0, "Product with this serial number does not exist.");
        Product memory product = products[index - 1];
        return (product.name, product.model, product.dealer, product.serialNumber, product.sold, product.customerName,product.customerEmail,product.salesDate,product.warranty);
    }

    function getProductsByDealer(string memory dealer) public view onlyDealer returns (Product[] memory) {
    Product[] memory dealerProducts = new Product[](products.length);
    uint count = 0;
    for (uint i = 0; i < products.length; i++) {
        if (keccak256(bytes(products[i].dealer)) == keccak256(bytes(dealer))) {
            dealerProducts[count] = products[i];
            count++;
        }
    }
    Product[] memory result = new Product[](count);
    for (uint i = 0; i < count; i++) {
        result[i] = dealerProducts[i];
    }
    return result;
}

    
function markProductAsSold(
    string memory serialNumber,
    string memory customerName,
    string memory customerEmail,
    string memory salesDate,
    string memory warranty,
    uint256 amount
) public onlyDealer{
    require(amount > 0, "Amount must be greater than 0.");
    require(balances[msg.sender] >= amount, "Insufficient balance.");
    balances[msg.sender] -= amount;
    balances[address(this)] += amount;
    
    uint index = serialNumberToIndex[serialNumber];
    require(index != 0, "Product with this serial number does not exist.");
    Product storage product = products[index - 1];
    require(product.sold == false, "Product is already sold.");
    product.sold = true;
    product.customerName = customerName;
    product.customerEmail = customerEmail;
    product.salesDate = salesDate;
    product.warranty = warranty;
    serialNumberToCustomer[serialNumber] = customerName;
}

// function transferOwnershipToDealer(address dealer, uint productId) public {
//     require(manufacturers[msg.sender], "Only manufacturers can call this function");
//     require(dealers[dealer], "Invalid dealer address");

//     Product storage product = products[productId];

//     require(!product.sold, "Product has already been sold");


//     emit OwnershipTransferred(productId, msg.sender, dealer);
// }

}