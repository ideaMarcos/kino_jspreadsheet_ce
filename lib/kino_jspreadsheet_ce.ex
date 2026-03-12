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
    - `:min_dimensions` - An array `[cols, rows]` for minimum dimensions.
    - `:toolbar` - Boolean to show/hide the toolbar.
  """
  use Kino.JS, assets_path: "lib/assets/build"
  use Kino.JS.Live

  @doc """
  Creates a new jspreadsheet widget.

  Takes keyword arguments for configuration.
  """

  def new() do
    new(min_dimensions: [1, 1])
  end

  def new(opts) when is_list(opts) do
    payload =
      opts
      |> Enum.into(%{})
      |> normalize_options()

    Kino.JS.Live.new(__MODULE__, payload)
  end

  def new(opts) when is_list(opts) do
    payload =
      opts
      |> Enum.into(%{})
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

  def get_config_from_js(spreadsheet) do
    Kino.JS.Live.call(spreadsheet, "get_config_from_js")
    |> Map.to_list()
    |> Enum.reject(fn {_, v} -> is_nil(v) end)
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

  def config_to_table_reader(config, first_row_has_columns? \\ false)
      when is_list(config) do
    data = Keyword.get(config, :data, [])

    columns =
      Keyword.get(config, :columns, [])
      |> Enum.map(&get_title_from_column/1)

    {columns, data} =
      if first_row_has_columns? do
        get_columns_from_first_row(data)
      else
        {columns, data}
      end

    columns =
      columns
      |> Enum.with_index()
      |> Enum.map(fn {idx, col} -> fill_in_empty_columns(idx, col) end)

    %KinoJspreadsheetCe.TableReader{
      rows: cast_all_numbers(data),
      columns: columns
    }
  end

  defp get_title_from_column(%{title: title}), do: title
  defp get_title_from_column(%{}), do: ""
  defp get_title_from_column(title), do: title

  defp get_columns_from_first_row([]), do: {[], []}
  defp get_columns_from_first_row([columns | data]), do: {columns, data}

  defp fill_in_empty_columns("", idx), do: "col#{idx + 1}"
  defp fill_in_empty_columns(nil, idx), do: "col#{idx + 1}"
  defp fill_in_empty_columns(col, _idx), do: col

  defp cast_all_numbers(data) do
    Enum.map(data, fn row ->
      Enum.map(row, &cast_if_number/1)
    end)
  end

  defp cast_if_number(val) when is_binary(val) do
    case Float.parse(val) do
      {num, ""} -> try_cast_int(num)
      :error -> val
    end
  end

  defp cast_if_number(val) do
    val
  end

  defp try_cast_int(float_val) when is_float(float_val) do
    int_val = trunc(float_val)

    if float_val == int_val do
      int_val
    else
      float_val
    end
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, to_js_payload(ctx.assigns), ctx}
  end

  defp to_js_payload(s) do
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
  def handle_event("update_sheet", config, ctx) do
    columns =
      Enum.map(config["columns"], fn col ->
        for {key, val} <- col, into: %{} do
          {String.to_existing_atom(key), val}
        end
      end)

    {:noreply, assign(ctx, data: config["data"], columns: columns)}
  end

  @impl true
  def handle_call("get_config_from_js", _from, ctx) do
    {:reply, to_js_payload(ctx.assigns), ctx}
  end
end
