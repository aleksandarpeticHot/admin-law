import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip
} from '@heroui/react';
import Link from 'next/link';
import { DynamicIcon } from 'lucide-react/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

type LucideIconName = keyof typeof dynamicIconImports;

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
}

type TableColumHeaderType = {
  name: string,
  key?: string
}

type RowType = {
  id: string;
  [key: string]: string;
}

export type ActionColumnType = {
  popupMessage: string | React.ReactNode
  type: string,
  name: LucideIconName,
  size?: string,
  link?: string
}

interface Props {
  tableColumnHeaders: TableColumHeaderType[]
  rows: RowType[]
  page: number
  noResultsMessage?: string
  actions?: ActionColumnType[]
  handleClickAction?: (row: RowType, type: string) => void,
}

const TableComp: React.FC<Props> = (props) => {
  const {
    tableColumnHeaders,
    rows,
    noResultsMessage,
    actions,
    handleClickAction
  } = props

  const [page, setPage] = React.useState(props.page);

  function renderCell(value: string) {
    return <div
      className={'text-default-500'}
    >
      {value}
    </div>
  };

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background'
          }}
          color='default'
          isDisabled={false}
          page={page}
          total={rows.length}
          variant='light'
          onChange={setPage}
        />
      </div>
    );
  }, [rows.length, page]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]/tr:first:before:rounded-none',
        'group-data-[first=true]/tr:last:before:rounded-none',
        // middle
        'group-data-[middle=true]/tr:before:rounded-none',
        // last
        'group-data-[last=true]/tr:first:before:rounded-none',
        'group-data-[last=true]/tr:last:before:rounded-none'
      ]
    }),
    []
  );

  function renderLinkAction(action: ActionColumnType, row: RowType) {
    return <Tooltip
      content={action.popupMessage}
      key={`${row.id}-${action.name}`}
    >
      <Link className='cursor-pointer' href={action.link?.replace(':id', row.id) as string}>
        <DynamicIcon
          color='#006FEE'
          size={20}
          name={action.name}
        />
      </Link>
    </Tooltip>
  }

  function renderActionCell(row: RowType) {
    return actions?.map((action: ActionColumnType) => {
      if (action.link) {
        return renderLinkAction(action, row)
      }
      return <Tooltip
        key={`${row.id}-${action.name}`}
        content={action.popupMessage}
      >
        <DynamicIcon
          color='#006FEE'
          onClick={() => {
            if (handleClickAction) {
              handleClickAction(row, action.type)
            }
          }}
          name={action.name} />
      </Tooltip>
    })
  }

  return (
    <Table
      isCompact
      removeWrapper
      aria-label='Example table with custom cells, pagination and sorting'
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background'
        }
      }}
      classNames={classNames}
    >
      <TableHeader columns={tableColumnHeaders}>
        {(column) => (
          <TableColumn
            key={column?.key || `actions${Math.random}`}
            align={'center'}
            className='text-sm'
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={noResultsMessage ?? 'No users found'}>
        {rows.map((row: RowType) => {
          return <TableRow key={row?.id}>
            {tableColumnHeaders.map((column) => {
              if (column.key) {
                const cellValue = row[column.key as keyof RowType];
                return <TableCell key={`${column.key}${row.id}`}>{renderCell(cellValue)}</TableCell>
              } else {
                return <TableCell key={`actions${row.id}`} className='flex align-center justify-center'>
                  {renderActionCell(row)}
                </TableCell>
              }
            })}
          </TableRow>
        })}
      </TableBody>
    </Table>
  );
}
export default TableComp