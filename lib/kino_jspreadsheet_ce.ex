defmodule KinoJspreadsheetCe do
  @moduledoc """
  A Kino widget for displaying interactive spreadsheets in Livebook using jspreadsheet-ce.

  ## Example

      KinoJspreadsheetCe.new(
        data: [
          ["Name", "Department", "Salary"],
          ["Alice", "Engineering", 80000],
          ["Bob", "Marketing", 60000],
          ["Charlie", "Sales", 70000]
        ]
      )

  ## Options

    - `:data` - A list of lists representing the spreadsheet data. Each inner list is a row.
    - `:columns` - A list of column configurations. Defaults to auto-generated columns.
    - `:min_dimensions` - An array `[rows, cols]` for minimum dimensions.
    - `:toolbar` - Boolean to show/hide the toolbar.
  """

  use Kino.JS, assets_path: "lib/assets/build"

  @doc """
  Creates a new jspreadsheet widget.

  Takes optional keyword arguments for configuration.
  """
  def new(opts \\ []) do
    payload =
      opts
      |> Enum.into(%{})
      |> normalize_options()

    Kino.JS.new(__MODULE__, payload)
  end

  defp normalize_options(opts) do
    %{
      data: Map.get(opts, :data),
      columns: Map.get(opts, :columns),
      min_dimensions: Map.get(opts, :min_dimensions),
      toolbar: Map.get(opts, :toolbar, false)
    }
  end
end
