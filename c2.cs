public string CerrarOrdenDevuelta(Orden oOrden)
      {
          string resp = String.Empty;
          Conexion cn = new Conexion();

          SqlCommand cmd = new SqlCommand("sp_CerrarDevolucion", cn.obtener(0));
          cmd.CommandType = CommandType.StoredProcedure;

          cmd.Parameters.AddWithValue("@idOrden", oOrden.id);
          cmd.Parameters.AddWithValue("@idUsuario", oOrden.Usuario.idUsuario);
          cmd.Parameters.AddWithValue("@proceso", oOrden.devolucion.proceso);
          cmd.Parameters.AddWithValue("@respuesta", oOrden.devolucion.respuesta);
          cmd.Parameters.Add("@msj",SqlDbType.VarChar,50).Direction = ParameterDirection.Output;

          cn.obtener(0).Open();
          SqlTransaction trans = cn.obtener(0).BeginTransaction();

          try
          {
              cmd.Transaction = trans;
              cmd.ExecuteNonQuery();
              resp = cmd.Parameters["@msj"].Value.ToString();
              trans.Commit();

          }
          catch (Exception ex)
          {
              trans.Rollback();
              resp = ex.Message;
          }
          finally
          {
              cn.obtener(0).Close();
          }

          return resp;

      }

      public DataTable OrdenesOnline(Reutilizable oReutilizable)
      {

          Conexion cn = new Conexion();
          DataTable tb = new DataTable();
          SqlDataAdapter da = new SqlDataAdapter("sp_OrdenesOnLine", cn.obtener(0));
          da.SelectCommand.Parameters.AddWithValue("@fechaI", oReutilizable.fechaI);
          da.SelectCommand.Parameters.AddWithValue("@fechaF", oReutilizable.fechaF);
          da.SelectCommand.CommandType = CommandType.StoredProcedure;

          try
          {
              cn.obtener(0).Open();
              da.Fill(tb);
          }
          catch (Exception ex)
          {
              string mensaje = ex.Message;
          }
          finally
          {
              cn.obtener(0).Close();
          }
          return tb;

      }

      public string registrarAgendamiento(int idOrden, string fecha, int idUsuario,string obs)
      {
          string resp = String.Empty;
          Conexion cn = new Conexion();
          SqlCommand cmd = new SqlCommand("sp_registrarAgendamiento", cn.obtener(0));
          cmd.CommandType = CommandType.StoredProcedure;
          cmd.Parameters.AddWithValue("@idOrden", idOrden);
          cmd.Parameters.AddWithValue("@fechaAgendamiento", fecha);
          cmd.Parameters.AddWithValue("@observacion", obs);
          cmd.Parameters.AddWithValue("@idUsuarioRegistro", idUsuario);

           cn.obtener(0).Open();
          SqlTransaction trans = cn.obtener(0).BeginTransaction();

          try
          {
              cmd.Transaction = trans;
              cmd.ExecuteNonQuery();
              //resp = cmd.Parameters["@msj"].Value.ToString();
              trans.Commit();
          }
          catch (Exception ex)
          {
              trans.Rollback();
              resp = ex.Message;
          }
          finally
          {
              cn.obtener(0).Close();
          }
          return resp;

      }

      #endregion
