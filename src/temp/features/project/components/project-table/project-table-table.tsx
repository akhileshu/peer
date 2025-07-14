import { Table } from "@/components/ui/table";

export function ProjectTableTable({ data }: { data: any[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

