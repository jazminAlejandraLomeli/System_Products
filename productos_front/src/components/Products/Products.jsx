import { useEffect, useState } from "react";
import { getProducts } from "./../../Services/ProductService";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../../components/ui/button";

export default function Products() {
  const [data, setData] = useState([]);
const [meta, setMeta] = useState({
  current_page: 1,
  last_page: 1,
  total: 0,
});  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getProducts(page, search);
        setData(response.data || []);
       
        setMeta({
          current_page: response.current_page,
          last_page: response.last_page,
          total: response.total,
        });  
      } catch (error) {
        console.error(error);
      }
    };

    // Delay para no hacer demasiadas peticiones al escribir
    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
  }, [page, search]);

  // Si no hay datos y no estamos buscando nada, mostramos mensaje de carga
  if (data.length === 0 && !search) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground animate-pulse">
          Cargando productos...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Buscar productos..."
          className="max-w-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  {product.is_active ? "Activo" : "Inactivo"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación simple */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          // Usamos el "?" para que si meta es undefined, no truene
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          Shadcn
        >
          Anterior
        </Button>

        <div className="text-sm font-medium">
          {/* Usamos el operador de coalescencia ?? para poner un 1 por defecto */}
          Página {meta?.current_page ?? 1} de {meta?.last_page ?? 1}
        </div>

        <Button
          disabled={page >= (meta?.last_page || 1)}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
