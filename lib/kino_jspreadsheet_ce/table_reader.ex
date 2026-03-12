defmodule KinoJspreadsheetCe.TableReader do
  defstruct rows: [], columns: []
end

defimpl Table.Reader, for: KinoJspreadsheetCe.TableReader do
  def init(table) do
    rows = table.rows
    columns = table.columns

    if Enum.empty?(columns) do
      :none
    else
      metadata = %{
        columns: columns,
        count: length(rows)
      }

      {:rows, metadata, rows}
    end
  end
end
