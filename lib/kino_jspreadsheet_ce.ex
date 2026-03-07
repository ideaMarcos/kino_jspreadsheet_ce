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
  use Kino.JS.Live

  @doc """
  Creates a new jspreadsheet widget.

  Takes keyword arguments for configuration.
  """
  def new(opts) when is_list(opts) do
    payload =
      opts
      |> Enum.into(%{})
      |> normalize_options()

    Kino.JS.Live.new(__MODULE__, payload)
  end

  def new(payload) when is_map(payload) do
    payload =
      payload
      |> normalize_options()

    Kino.JS.Live.new(__MODULE__, payload)
  end

  defp normalize_options(opts) do
    %{
      data: Map.get(opts, :data),
      columns: Map.get(opts, :columns),
      min_dimensions: Map.get(opts, :min_dimensions),
      toolbar: Map.get(opts, :toolbar, false),
      tabs: Map.get(opts, :tabs),
      context_menu: Map.get(opts, :context_menu)
    }
  end

  def to_struct(spreadsheet) do
    Kino.JS.Live.call(spreadsheet, "to_struct")
  end

  @impl true
  def init(payload, ctx) do
    {:ok,
     assign(ctx,
       data: payload.data,
       columns: payload.columns,
       min_dimensions: payload.min_dimensions,
       toolbar: payload.toolbar,
       tabs: payload.tabs,
       context_menu: payload.context_menu
     )}
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, to_spreadsheet_struct(ctx.assigns), ctx}
  end

  defp to_spreadsheet_struct(s) do
    %{
      data: s.data,
      columns: s.columns,
      min_dimensions: s.min_dimensions,
      toolbar: s.toolbar,
      tabs: s.tabs,
      context_menu: s.context_menu
    }
  end

  @impl true
  def handle_event("set_data", data, ctx) do
    {:noreply, assign(ctx, data: data)}
  end

  @impl true
  def handle_call("to_struct", _from, ctx) do
    {:reply, to_spreadsheet_struct(ctx.assigns), ctx}
  end
end
