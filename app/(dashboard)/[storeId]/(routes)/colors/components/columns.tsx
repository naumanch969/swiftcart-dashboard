"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"



export type ColorColumn = {
    id: string
    name: string
    value: string
    createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({ row }) => (
            <div className="flex items-center justify-start gap-2 ">
                <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.value }} />
                {row.original.value}
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]
