import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaEye } from "react-icons/fa";
import { SearchedEngineers } from "../MessageInput/MessageInput.types";

export const parseArrayValue = (value?: string) => {
  if (value) {
    try {
      return JSON.parse(value)?.join(",");
    } catch {
      return value;
    }
  }
  return "-";
};

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function EngineersTable({ records, caption }: Props) {
  return (
    <Table className="w-full max-w-[75%] overflow-x-auto">
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow className="">
          <TableHead className="w-fit">Name</TableHead>
          <TableHead className="w-fit">Email</TableHead>
          {/* <TableHead>FT Status</TableHead> */}
          <TableHead>Work Experience</TableHead>
          <TableHead className="w-[170px]">Skills</TableHead>
          <TableHead className="text-right">FT Salary</TableHead>
          <TableHead className="text-right">PT Salary</TableHead>
          {/* <TableHead className="text-right">Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {records?.map((record) => (
          <TableRow key={record.userId}>
            <TableCell className="font-medium">{record.name}</TableCell>
            <TableCell className="font-medium">
              {parseArrayValue(record?.email)}
            </TableCell>
            {/* <TableCell>{record.fullTimeAvailability}</TableCell>
                        <TableCell>{record.partTimeAvailability}</TableCell> */}
            <TableCell>{record?.WorkExperience}</TableCell>
            <TableCell className="">{record.Skills}</TableCell>
            <TableCell className="text-right">
              {record.fullTimeSalary}
            </TableCell>
            <TableCell className="text-right">
              {record.partTimeSalary}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type Props = {
  caption?: string;
  records: SearchedEngineers[];
};
