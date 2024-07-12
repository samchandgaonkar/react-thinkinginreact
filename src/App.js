import { useState } from "react";

const products = require("./products.json");

export default function App() {
  return (
    <div className="main">
      <div className="container mx-auto">
        <div className="row">Filterable Product Table</div>
        <FilterableTable key={products} products={products}></FilterableTable>
      </div>
    </div>
  );
}

function FilterableTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <div className="row text-center">
      <div className="col-3 fw-bold">{category}</div>
    </div>
  );
}

function ProductRow({ product }) {
  return (
    <div className="row" key={"product.name"}>
      <div className={"col-3 " + (product.stocked ? "" : "oos")}>
        {product.name}
      </div>
      <div className={"col-3"}>{product.price}</div>
    </div>
  );
}

function TableHeaderRow() {
  return (
    <div className="row" key="header">
      <div className="col-3" key="name">
        Name
      </div>
      <div className="col-3" key="price">
        Price
      </div>
    </div>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <div className="row">
      <form>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
        <label className="mx-2">
          <input
            type="checkbox"
            value={filterText}
            className="mr-2"
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
          />
          {}Only Show Products in Stock
        </label>
      </form>
    </div>
  );
}

function ProductTable({ products, inStockOnly, filterText }) {
  const rows = [];
  let lastCategory = null;
  rows.push(<TableHeaderRow key={"tableheader"} />);
  products.forEach((product) => {
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return <>{rows}</>;
}
