import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  RowSelection,
} from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderItem, OrderItemToServer } from "~/types/orderTypes";
import NewItemRow from "./NewItemRow";
import { useEffect, useState } from "react";
import EditableInput from "~/elements/EditableInput";
import OrderItemActions from "./OrderItemActions";
import { editOIState, orderState } from "~/state/state";
import { useSnapshot } from "valtio";
import { orderItemSchema } from "~/utils/orders/orderItemSchema";
import { useMutation } from "react-query";
import { udpateOrderItem } from "~/services/ordersService";
import toast from "react-hot-toast";
import {
  orderError,
  orderSave,
  orderSaved,
} from "~/utils/orders/orderSaveStatus";
import Button from "~/elements/Button";
import OrderItemPartNumberModal from "./OrderItemPartNumberModal";

const columnHelper = createColumnHelper<OrderItem>();

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const OrderItemCell = <T extends string | number>({
  initialValue,
  placeholder,
  notEditable,
  aggregationFn,
  validatorFn,
  orderItem,
  oItemProperty,
}: {
  initialValue: T;
  placeholder: string;
  notEditable: boolean;
  aggregationFn?: (val: T | undefined) => string | number | undefined;
  validatorFn?: (val: T | undefined) => boolean;
  orderItem: OrderItem;
  oItemProperty: keyof OrderItem;
}) => {
  const [value, setValue] = useState<T>(initialValue);
  const editOISnap = useSnapshot(editOIState).orderItems;
  const foundItem = editOISnap[orderItem.id] as OrderItem | undefined;

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const foundProp = foundItem
    ? (foundItem[oItemProperty] as T | undefined)
    : undefined;

  return (
    <div className="table-cell whitespace-nowrap text-sm text-gray-500 ">
      <EditableInput
        value={foundItem ? foundProp : value}
        onSave={
          foundItem
            ? (value) => {
                const val = value as T;
                editOIState.orderItems[orderItem.id][oItemProperty] =
                  val as never;
              }
            : (value) => setValue(value as T)
        }
        placeholder={placeholder}
        aggregationFn={aggregationFn || undefined}
        validatorFn={validatorFn || undefined}
        hideButtons
        notEditable={notEditable}
        emptyType="text"
        componentStyle="text-md"
      />
    </div>
  );
};

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
  const editOISnap = useSnapshot(editOIState).orderItems;
  const orderSnap = useSnapshot(orderState).order;

  const toggleEdit = (orderItem: OrderItem) => {
    const newOI = { ...editOISnap };
    if (isSelected(orderItem)) {
      delete newOI[orderItem.id];
      editOIState.orderItems = newOI;
      return;
    }
    editOIState.orderItems[orderItem.id] = orderItem;
  };

  const orderItemEditMutation = useMutation(
    ({
      mOrderItem,
      mItems,
    }: {
      mOrderItem: OrderItem;
      mItems: OrderItem[];
    }) => {
      return udpateOrderItem(mOrderItem);
    },
    {
      onMutate: async ({ mOrderItem, mItems }) => {
        orderSave();
        if (orderSnap) {
          const newOrderItems = mItems.map((oItem) => {
            if (oItem.id === mOrderItem.id) {
              return { ...oItem, ...mOrderItem };
            }
            return oItem;
          });
          if (orderState.order) orderState.order.items = newOrderItems;
        }
      },
      onSuccess: async () => orderSaved(),
      onError: async () => orderError(),
    }
  );

  const isSelected = (orderItem: OrderItem) =>
    Object.keys(editOISnap).includes(orderItem.id);

  const columns = [
    columnHelper.accessor("partNumber", {
      header: "Part Number",
      cell: (info) => {
        const [showModal, setShowModal] = useState<boolean>(false);
        const orderItem = info.row.original;
        const foundItem = editOISnap[orderItem.id] as OrderItem | undefined;
        const isRowSelected = isSelected(orderItem);

        return (
          <div className="flex whitespace-nowrap">
            {(
              isRowSelected ? !!foundItem?.vendorUrl : !!orderItem.vendorUrl
            ) ? (
              <div className="flex items-center -mb-0.5">
                <a
                  href={
                    isRowSelected ? foundItem?.vendorUrl : orderItem.vendorUrl
                  }
                  target="_blank"
                  className="underline"
                >
                  {info.cell.getValue()}
                </a>
                <FontAwesomeIcon
                  className="pl-1.5"
                  size="sm"
                  icon="arrow-up-right-from-square"
                />
              </div>
            ) : (
              <span>{info.cell.getValue()}</span>
            )}
            {isSelected(orderItem) ? (
              <span className="pl-2 ml-auto">
                <Button
                  iconName="pencil"
                  size="sm"
                  color="blue"
                  style="secondary"
                  onClick={() => setShowModal(true)}
                />
              </span>
            ) : null}
            <OrderItemPartNumberModal
              modalVisibility={showModal}
              setModalVisibility={setShowModal}
              orderItem={foundItem || orderItem}
              onSubmit={({ partNumber, vendorUrl }) => {
                if (foundItem)
                  editOIState.orderItems[orderItem.id] = {
                    ...foundItem,
                    vendorUrl,
                    partNumber,
                  };

                setShowModal(false);
              }}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
      cell: (info) => {
        return (
          <OrderItemCell<number>
            orderItem={info.row.original}
            oItemProperty="quantity"
            initialValue={info.cell.getValue()}
            validatorFn={(val) => {
              return val ? !isNaN(val) : false;
            }}
            placeholder={String(info.column.columnDef.header) || ""}
            notEditable={!isSelected(info.row.original)}
          />
        );
      },
      size: 10,
    }),

    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => {
        return (
          <OrderItemCell<string>
            initialValue={info.cell.getValue() || ""}
            orderItem={info.row.original}
            oItemProperty="description"
            validatorFn={(val) => {
              if (val) return val.length < 250;
              else return true;
            }}
            placeholder={String(info.column.columnDef.header) || ""}
            notEditable={!isSelected(info.row.original)}
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
            orderItem={info.row.original}
            oItemProperty="unitCost"
            validatorFn={(val) => {
              return val ? !isNaN(val) : false;
            }}
            placeholder={String(info.column.columnDef.header) || ""}
            notEditable={!isSelected(info.row.original)}
            aggregationFn={(val) => (val ? `${formatter.format(val)}` : val)}
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
        return formatter.format(total);
      },
    }),

    columnHelper.accessor("notes", {
      header: "Notes",
      cell: (info) => {
        return (
          <OrderItemCell<string>
            initialValue={info.cell.getValue() || ""}
            orderItem={info.row.original}
            oItemProperty="notes"
            validatorFn={(val) => {
              if (val) return val.length < 250;
              else return true;
            }}
            placeholder={String(info.column.columnDef.header) || ""}
            notEditable={!isSelected(info.row.original)}
          />
        );
      },
    }),
    columnHelper.display({
      header: "Edit",
      cell: ({ row }) => {
        const editedRow = editOISnap[row.original.id] as OrderItem | undefined;
        const [cleanState, setCleanState] =
          useState<OrderItemToServer | null>();
        if (editedRow) {
          useEffect(() => {
            const thing = async () =>
              await orderItemSchema
                .validate(editedRow, { abortEarly: false })
                .then((cleanState: OrderItemToServer) => {
                  setCleanState(cleanState);
                })
                .catch(() => {
                  setCleanState(null);
                });
            thing();
          }, [editedRow]);
        }

        const currentOrderItems = orderSnap?.items;

        return isSelected(row.original) ? (
          <OrderItemActions
            orderItem={row.original}
            onDelete={() => toggleEdit(row.original)}
            onSave={() => {
              toggleEdit(row.original);
              if (editedRow && currentOrderItems) {
                const mOrderItem: OrderItem = { ...editedRow };
                orderItemEditMutation.mutate({
                  mOrderItem,
                  mItems: currentOrderItems,
                });
              }
            }}
            disableSave={!cleanState}
          />
        ) : (
          <div
            className="text-blue-600 underline justify-center "
            onClick={() => toggleEdit(row.original)}
          >
            <span className="select-none cursor-pointer">Edit</span>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: orderItems,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex flex-col ">
        <div className="inline-block w-full py-2 align-middle">
          <div className="overflow-hidden shadow ring-1 ring-opacity-5 rounded ring-black md:rounded-lg overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 scrollbar-thumb-rounded scrollbar-track-rounded">
            <div className="table w-full ">
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
              <div className="transition delay-100 table-row-group ">
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
