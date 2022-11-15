import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  RowData,
} from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderItem } from "~/types/orderTypes";
import NewItemRow from "./NewItemRow";
import { useEffect, useState } from "react";
import EditableInput from "~/elements/EditableInput";

const columnHelper = createColumnHelper<OrderItem>();

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const OrderItemCell = <T extends string | number>({
  initialValue,
  colIdx,
  editable,
  aggregationFn,
}: {
  initialValue: T;
  colIdx: string;
  editable: boolean;
  aggregationFn?: (val: T) => string | number;
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState<T>(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    //
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="table-cell whitespace-nowrap px-3 py-2 text-sm text-gray-500 ">
      <EditableInput
        value={value}
        onChangeFunc={(e) => setValue(e.target.value as unknown as T)}
        placeholder={colIdx}
        aggregationFn={aggregationFn || undefined}
        hideButtons
        editable={editable}
        emptyType="box"
        componentStyle="text-md"
      />
    </div>
  );
};

const columns = [
  columnHelper.accessor("partNumber", {
    header: "Part Number",
    cell: (info) => {
      const orderItem = info.row.original;

      if (orderItem.vendorUrl)
        return (
          <div className="flex items-center -mb-0.5">
            <a href={orderItem.vendorUrl} target="_blank" className="underline">
              {info.cell.getValue()}
            </a>
            <FontAwesomeIcon
              className="pl-1.5"
              size="sm"
              icon="arrow-up-right-from-square"
            />
          </div>
        );
      return <span>{info.cell.getValue()}</span>;
    },
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: (info) => {
      return (
        <OrderItemCell<number>
          initialValue={info.cell.getValue()}
          colIdx={info.column.id}
          editable={info.row.getIsSelected()}
        />
      );
    },
    size: 10,
  }),

  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => {
      return (
        <OrderItemCell
          initialValue={info.cell.getValue() || ""}
          colIdx={info.column.id}
          editable={info.row.getIsSelected()}
        />
      );
    },
  }),
  columnHelper.accessor("unitCost", {
    header: "Unit Cost",
    cell: (info) => {
      return (
        <OrderItemCell<number>
          initialValue={info.cell.getValue()}
          colIdx={info.column.id}
          editable={info.row.getIsSelected()}
          aggregationFn={(val) => `${formatter.format(val)}`}
        />
      );
    },
  }),

  columnHelper.display({
    header: "Total Cost",
    cell: (info) => {
      const qty = info.row.original.quantity;
      const unitCost = info.row.original.unitCost;
      if (qty && unitCost) return formatter.format(qty * unitCost);
    },
    aggregationFn: "sum",
    footer: (info) => {
      const rows = info.table.getCoreRowModel().rows;
      const total = rows.reduce((net, row) => {
        const cells = row.getAllCells();
        let qty: number | undefined = undefined;
        let amt: number | undefined = undefined;
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          switch (cell.column.id) {
            case "quantity":
              qty = cell.getValue() as number;
              break;
            case "unitCost":
              amt = cell.getValue() as number;
              break;
            default:
          }
        }
        if (!(qty && amt)) throw Error();
        return net + qty * amt;
      }, 0);
      const aggregationFn = info.column.getAggregationFn();
      if (!aggregationFn) return null;
      const output = aggregationFn("unitCost", rows, rows) as number;
      return formatter.format(total);
    },
  }),

  columnHelper.accessor("notes", {
    header: "Notes",
  }),
  columnHelper.display({
    header: "Edit",
    cell: ({ row }) => (
      <div onClick={row.getToggleSelectedHandler()}>
        <div className="text-indigo-500 underline cursor-pointer min-w-min	">
          Edit
        </div>
      </div>
    ),
  }),
];

const OrderItemsTable = ({
  orderItems,
  newItemStuff,
}: {
  orderItems: OrderItem[];
  newItemStuff: {
    newItems: string[];
    setNewItems: (newItems: string[]) => void;
  };
}) => {
  const table = useReactTable({
    data: orderItems,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex flex-col">
        <div className="inline-block w-full py-2 align-middle">
          <div className="overflow-hidden shadow ring-1 ring-opacity-5 rounded ring-black  md:rounded-lg">
            <div className="table w-full">
              <div className="bg-white table-header-group">
                {table.getHeaderGroups().map((headerGroup) => (
                  <div key={headerGroup.id} className="table-row">
                    {headerGroup.headers.map((header) => (
                      <div
                        key={header.id}
                        style={{ width: header.getSize() }}
                        className={`table-cell text-left text-sm font-semibold text-gray-900 ${
                          header.index === 0
                            ? "py-3.5 pl-4 pr-3 sm:pl-6 "
                            : "px-3 py-3.5"
                        }
                        `}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="transition delay-100 table-row-group">
                <>
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <div
                        key={row.id}
                        className="table-row border-gray-200 border-t odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <div
                            key={cell.id}
                            className={`whitespace-pre-wrap table-cell  ${
                              cell.column.id === "partNumber"
                                ? "whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-700 sm:pl-6"
                                : "whitespace-nowrap px-3 py-2 text-sm text-gray-500 max-w-min"
                            }`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                  {newItemStuff.newItems.map((id) => (
                    <NewItemRow
                      key={id}
                      id={id}
                      newItems={newItemStuff.newItems}
                      setNewItems={newItemStuff.setNewItems}
                    />
                  ))}
                </>
              </div>
              <div className="table-footer-group">
                {table.getFooterGroups().map((group) => (
                  <div key={group.id} className="table-row">
                    {group.headers.map((header) => {
                      return (
                        <div
                          key={header.id}
                          className="border-t-[2px] border-gray-300 table-cell whitespace-nowrap px-3 py-2 text-sm text-gray-500"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.footer,
                                header.getContext()
                              )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemsTable;
