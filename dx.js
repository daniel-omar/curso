'use strict';
var dUser, orden, $contrata;
var asignado = [];
var bigData;
    var strDate, loadDate;
    var fechaAgendamiento
    $(document).ready(function () {
        firebaseInit()
        console.log(moment(new Date()).format('YYYY-MM-DD hh:00:00'))
        //datetimepicker calendar
        $('#txtFecha').datetimepicker({
            locale: 'es',
            minDate: (moment(new Date()).format('YYYY-MM-DD H:00:00')).toString(),
            inline: true,
            sideBySide: true,
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-plus',
                down: 'fa fa-minus',
                next: 'fa fa-chevron-right',
                previous: 'fa fa-chevron-left'
            }
        });

        $.fn.datetimepicker.defaults.icons = {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-dot-circle-o',
            clear: 'fa fa-trash',
            close: 'fa fa-times'
        };


        dUser = JSON.parse(localStorage.getItem('usuario'));

        $('#tbPendientes thead tr:eq(1) th').each(function (i) {
            $(this).html('<div class="md-input-wrapper" style="margin:0"><input style="background-color:#F4F4F4" type="text" class="md-form-control lblhFoot" placeholder="Buscar" /></div>');
            $('input', this).on('keyup change', function () {
                if (table.column(i).search() !== this.value) {
                    table
                        .column(i)
                        .search(this.value)
                        .draw();
                }
            });
        });

        // DataTable
        var table = $('#tbPendientes').DataTable({
            //data: tabla,
            "scrollY": "380px",
            orderCellsTop: true,
            fixedHeader: true,
            "scrollCollapse": true,
            "paging": true,
            "scrollX": true,
            "lengthMenu": [[200, 500, 700], [200, 500, 700]],
            fixedColumns: {
                leftColumns: 1,
                leftColumns: 2
            }
        });

        $contrata = dUser.oContrata.id;

        //$('#sidebar').click();

        //$('#navmenu').parent().parent().removeClass()
        //$('#navmenu').parent().parent().addClass('sidebar-mini fixed sidebar-collapse header-fixed')

        conf_fecha('#date');
        conf_fecha('#datef');

        var d = new Date();
        strDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();


        ///******* lista de actividades *******/
        listarActividad('#cboActividad', dUser.oContrata.oNegocio.id);

        /******* lista de contratas *******/
        listarContrata('#cboContrata', dUser.oContrata.oNegocio.id);

        /******* lista de nodos *******/
        listarNodo('#cboNodo', dUser.oContrata.oNegocio.id);

        /******* lista de gestores *******/
        //listarGestorXContrata();
        $('#cboGestor').multiselect({
            nonSelectedText: '-- Seleccionar ' + $('#cboGestor').data('nombre') + ' --',
            buttonWidth: '100%'
        });

        /******* lista de gestores *******/
        //listarGestorXContrata();
        $('#cboTecnico').multiselect({
            nonSelectedText: '-- Seleccionar ' + $('#cboTecnico').data('nombre') + ' --',
            buttonWidth: '100%'
        });


        $('#tbPendientes').attr('style', '');

        $('#mdBuscar').modal('show');

        $('select[multiple="multiple"]').parent().children('div').children().removeAttr('title');

    });

var allSelected_ac = true;
function listarActividad($combo, $negocio) {

    var options = "";
    var result = post('../formRutinas/GetTicket.aspx/listarActividades', JSON.stringify({ negocio: $negocio }), false);
    $($combo).html("");

    if (result.value == true) {
        $.each(result.data.entityD, function (i, row) {
            options = options.concat('<option value="', row.id, '">', row.descripcion, '</option>');
        })

        $($combo).html(options);
    }

    $($combo).multiselect({
        nonSelectedText: '-- Seleccionar ' + $($combo).data('nombre') + ' --',
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        includeSelectAllOption: true,
        buttonWidth: '100%',
        allSelectedText: 'TODAS LAS ACTIVIDADES',
        maxHeight: 200,
        onSelectAll: function () {
            allSelected_ac = true;
        },
        onChange: function () {
            allSelected_ac = false;
        }
    })
    .multiselect('selectAll', false)
    .multiselect('updateButtonText');

}

function listarContrata($combo, $negocio) {

    var options = "";
    var response = post('../formRutinas/Tecnico.aspx/listarContratas', JSON.stringify({ negocio: $negocio }), false);

    $($combo).html('');
    if (response.data.valor) {
        options = options.concat('<option value="0"> SIN ASIGNAR </option>');
        $.each(response.data.entityD, function (i, item) {
            options = options.concat('<option value="', item.id, '">', item.nombre, '</option>');
        });
        $($combo).html(options);
    }

    $($combo).multiselect({
        nonSelectedText: '-- Seleccionar ' + $($combo).data('nombre') + ' --',
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        includeSelectAllOption: true,
        buttonWidth: '100%',
        allSelectedText: 'TODAS LAS CONTRATAS',
        maxHeight: 200
    });

}

function listarGestorXContrata() {

    var options = "";

    var cntr = $('#cboContrata').val().length > 0 ? $('#cboContrata').val().toString() : [].toString();

    var response = post('../formRutinas/AsignarContrata.aspx/listarGestores', JSON.stringify({ idContrata: cntr }), false);

    $('#cboGestor').html('');
    if (response.data.valor) {

        $('#cboGestor').multiselect('destroy');

        $.each(response.data.entityD, function (i, item) {
            options = options.concat('<option value="', item.idUsuario, '">', item.nombre + ' ' + item.apellidos, '</option>');
        });
        $('#cboGestor').html(options);


        $('#cboGestor').multiselect({
            nonSelectedText: '-- Seleccionar ' + $('#cboGestor').data('nombre') + ' --',
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            includeSelectAllOption: true,
            buttonWidth: '100%',
            maxHeight: 200
        });

    }

}

$('#cboContrata').on('change', function () {

    listarGestorXContrata()

});

$('#cboGestor').on('change', function () {

    listarTecnicosXGestor()

});

function listarTecnicosXGestor() {

    var options = "";

    var gest = $('#cboGestor').val().length > 0 ? $('#cboGestor').val().toString() : [].toString();

    var response = post('../formRutinas/AsignarContrata.aspx/ListarTecnicosPorGestor', JSON.stringify({ idGestor: gest }), false);

    $('#cboTecnico').html('');
    if (response.data.valor) {

        $('#cboTecnico').multiselect('destroy');

        $.each(response.data.entityD, function (i, item) {
            options = options.concat('<option value="', item.idUsuario, '">', item.nombre + ' ' + item.apellidos, '</option>');
        });
        $('#cboTecnico').html(options);


        $('#cboTecnico').multiselect({
            nonSelectedText: '-- Seleccionar ' + $('#cboTecnico').data('nombre') + ' --',
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            includeSelectAllOption: true,
            buttonWidth: '100%',
            maxHeight: 200
        });

    }

}

var allSelected_nd = true;
function listarNodo($combo, $negocio) {

    var options = "";
    var response = post('../formRutinas/AsignarContrata.aspx/listarNodos', JSON.stringify({ negocio: $negocio }), false);

    $($combo).html('');
    if (response.data.valor) {
        $.each(response.data.entityD, function (i, item) {
            options = options.concat('<option value="', item.id, '">', item.codigo, '</option>');
        });
        $($combo).html(options);
    }

    $($combo).multiselect({
        nonSelectedText: '-- Seleccionar ' + $($combo).data('nombre') + ' --',
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        includeSelectAllOption: true,
        buttonWidth: '100%',
        allSelectedText: 'TODOS LOS NODOS',
        maxHeight: 200,
        onSelectAll: function () {
            allSelected_nd = true;
        },
        onChange: function () {
            allSelected_nd = false;
        }
    })
        .multiselect('selectAll', false)
        .multiselect('updateButtonText');

}

$('#btnFiltroBuscar').on('click', function () {

    $('#mdBuscar').modal('show');

});

$('#cboEstado_actual').on('change', function () {

    var val = false;
    var str = '';

    switch ($(this).val()) {
        case "1": val = true, str; break;
        case "2": val, str = strDate; break;
    }

    $('#date').prop({ 'disabled': val }).val(str);
    $('#datef').prop({ 'disabled': val }).val(str);

});

$('#checkbox1').on('change', function () {

    if ($(this).prop('checked')) {

        habilitarComboMultiple('#cboContrata', false);
        habilitarComboMultiple('#cboActividad', false);
        habilitarComboMultiple('#cboNodo', false);
        habilitarComboMultiple('#cboGestor', false);
        habilitarComboMultiple('#cboTecnico', false);
        habilitarCaja('#txtOrden', true);
        habilitarCaja('#txtRequerimiento', true);
        habilitarCaja('#cboEstado_actual', false);
    }
    else {

        habilitarComboMultiple('#cboContrata', true);
        habilitarComboMultiple('#cboActividad', true);
        habilitarComboMultiple('#cboNodo', true);
        habilitarComboMultiple('#cboGestor', true);
        habilitarComboMultiple('#cboTecnico', true);

        habilitarCaja('#txtOrden', false);
        habilitarCaja('#txtRequerimiento', false);
        habilitarCaja('#cboEstado_actual', true);
        $('#date').prop({ 'disabled': true }).val('');
        $('#datef').prop({ 'disabled': true }).val('');
        $('#cboEstado_actual').val(1);
    }
});

function habilitarComboMultiple($combo,$valor) {
    var cbohtml = $($combo).parent().children('div').children();
    $($combo).prop({ 'disabled': $valor });
    $valor ? cbohtml.addClass('disabled') : cbohtml.removeClass('disabled');
    $($combo).parent().children('div').children().prop('disabled', $valor);
}

function habilitarCaja($campo, $valor) {
    $($campo).prop({ 'disabled': $valor });

    $('#txtOrden').val('');
    $('#txtRequerimiento').val('');
}

$('#txtOrden').keypress(function (e) {
    $('#txtRequerimiento').val('');
});

$('#txtRequerimiento').keypress(function (e) {
    $('#txtOrden').val('');
});

$('#btnAplicar').on('click', function () {

    if ($('#checkbox1').prop('checked')) {

        listarOrdenes();

    } else {

        var a = 0
        a += $('#txtOrden').val() != '' ? 1 : 0;
        a += $('#txtRequerimiento').val() != '' ? 1 : 0;

        if (a == 0) {
            alert('Faltan Ingresar Datos.');
            return;
        }

        buscarOrden($('#txtOrden').val(), $('#txtRequerimiento').val());


    }

    $('#mdBuscar').modal('hide');
    $('#ContentPlaceHolder1_btnExportar').removeClass("disabled");

});

function listarOrdenes() {

    var cntr = $('#cboContrata').val().length > 0 ? $('#cboContrata').val().toString() : [].toString();
    var nod = $('#cboNodo').val().length > 0 ? (allSelected_nd == true ? [].toString() : $('#cboNodo').val().toString() ) : [].toString();
    var actv = $('#cboActividad').val().length > 0 ? (allSelected_ac == true ? [].toString() : $('#cboActividad').val().toString()) : [].toString();
    var tec = $('#cboTecnico').val().length > 0 ?  $('#cboTecnico').val().toString() : [].toString();
    var gest = $('#cboGestor').val().length > 0 ? $('#cboGestor').val().toString() : [].toString();
    var fech = $('#date').val();
    var fechf = $('#datef').val();
    var estd = $('#cboEstado_actual option:selected').data('val');

    $('#hdEstado_actual').val($('#cboEstado_actual').val());

    $('#ContentPlaceHolder1_hddIdContrata').val(cntr);
    $('#ContentPlaceHolder1_hddIdNodo').val(nod);
    $('#ContentPlaceHolder1_hddIdActividad').val(actv);

    $('#ContentPlaceHolder1_hddUsuarioGestor').val(gest);
    $('#ContentPlaceHolder1_hddUsuarioTecnico').val(tec);

    $('#ContentPlaceHolder1_hddFechaHistorial').val(fech);
    $('#ContentPlaceHolder1_hddFechaHistorialf').val(fechf);
    $('#ContentPlaceHolder1_hddEstadoRutina').val($('#cboEstado_actual option:selected').data('val'));



    OrdenesPendientes_liquidados(cntr, nod, actv, estd, gest, tec, fech, fechf);

}

function OrdenesPendientes_liquidados($idcontrata, $codNodo, $idActividad, $idEstadoRutina, $gestor, $tecnico, $fecha_historial, $fecha_historialf) {


    if ($.fn.DatfnaTable.isDataTable('#tbPendientes')) {
        $('#tbPendientes').DataTable().destroy();
        $('table.DTFC_Cloned').DataTable().destroy();
    }

    $('#tbPendientes tbody').html('');


    var Object = {
        contrata: $idcontrata,
        nodo: $codNodo,
        actividad: $idActividad,
        estado: $idEstadoRutina,
        gestor: $gestor,
        tecnico: $tecnico,
        fecha_historial: $fecha_historial,
        fecha_historialf: $fecha_historialf
    }


    $.ajax({
        //async :false,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ obj: Object }),
        url: "../formRutinas/AsignarContrata.aspx/pendientesRutinas",
        /*data: JSON.stringify({ idContrata: $idcontrata, codNodo: $codNodo, idActividad: $idActividad, idEstadoRutina: $idEstadoRutina, gestor: $gestor, tecnico: $tecnico, fecha_historial: $fecha_historial, fecha_historialf: $fecha_historialf }),
        url: "http://www.anovo.pe/API_INGUZ/Orden/PendientesRutinas",
        headers: {
            'Authorization': 'faG84*aS1'
        },*/
        type: "POST",
        dataType: 'json',
        processData: false,
        success: function (data) {

            //var response = jQuery.parseJSON(data);
            var response = JSON.parse(data.d);
            console.log(response)
            //if (response.length > 0) {
            //    $.each(response, function (i, item) {
            //        agendar = agendar.concat(pintarOrdenesXAsignar(item));
            //    });
            //    $('#btnSeleccionar').prop('disabled',false);
            //}
            //$('#tbPendientes tbody').html(agendar);


            if (response.length > 0) {
                var tabla = []
                $.each(response, function (i, item) {
                    var fila = []
                    for (var prop in item) {
                        fila.push(item[prop]);
                    }
                    tabla.push(fila)
                });
                $('#btnSeleccionar').prop('disabled', false);
                var fecha = new Date();

                var month = fecha.getMonth() + 1;
                var day = fecha.getDate();
                var output = (('' + day).length < 2 ? '0' : '') + day + '-' + (('' + month).length < 2 ? '0' : '') + month + '-' + fecha.getFullYear();

                loadDate = fecha.getHours() + "\n: " + fecha.getMinutes() + '\n / ' + output;
                $('#lblLoadDate').text('Pendientes CMS Actualizado ' + loadDate);

            }


            ///****************************************************

            //$('#tbPendientes tfoot th label').each(function (i) {
            //    var title = $(this).text() == "" ? $(this).find('input').attr('placeholder') : $(this).text();
            //     $(this).html('<div class="md-input-wrapper"><input type="text" class="md-form-control lblhFoot" placeholder="' + title + '" data-index="' + i + '" /></div>');

            // });

            //// DataTable
            //var table = $('#tbPendientes').DataTable({
            //    "scrollY": "400px",
            //    "scrollCollapse": true,
            //    "paging": true,
            //    "scrollX": true,
            //    "lengthMenu": [[100, 200, 500, -1], [100, 200, 500, "TODOS"]],
            //    fixedColumns: {
            //        leftColumns: 1,
            //        leftColumns: 2
            //    }
            //});


            //// Apply the search
            //table.columns().every(function () {
            //    var that = this;

            //    $('input', this.footer()).on('keyup change', function () {
            //        if (that.search() !== this.value) {
            //            that
            //                .column($(this).data('index'))
            //                .search(this.value)
            //                .draw();
            //        }
            //    });
            //});
            ///************************************************


            $('#tbPendientes thead tr:eq(1) th').each(function (i) {
                //var title = $(this).text() == "" ? $(this).find('input').attr('placeholder') : $(this).text();
                //$(this).html('<div class="md-input-wrapper" style="margin:0"><input type="text" class="md-form-control lblhFoot" placeholder="' + title + '" data-index="' + i + '" /></div>');
                $(this).html('<div class="md-input-wrapper" style="margin:0"><input style="background-color:#F4F4F4" type="text" class="md-form-control lblhFoot" placeholder="Buscar" /></div>');
                $('input', this).on('keyup change', function () {
                    if (table.column(i).search() !== this.value) {
                        table
                            .column(i)
                            .search(this.value)
                            .draw();
                    }
                });
            });

            // DataTable
            var table = $('#tbPendientes').DataTable({
                data: tabla,
                "scrollY": "380px",
                orderCellsTop: true,
                fixedHeader: true,
                "scrollCollapse": true,
                "paging": true,
                "scrollX": true,
                "lengthMenu": [[200, 500, 700], [200, 500, 700]],
                fixedColumns: {
                    leftColumns: 1,
                    leftColumns: 2
                }
            });



        },
        error: function (er) {
            //alert(er);
            console.log(er)
        },
        beforeSend: function () {

            $loading('show');
            //$('.loader-block').show();
        },
        complete: function () {
            //$('.loader-block').hide();
            $loading('hide');
        },
    })

}

function buscarOrden($ot, $requerimiento) {


    $.ajax({
        //async :false,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ ot: $ot, requerimiento: $requerimiento }),
        url: "../formRutinas/AsignarContrata.aspx/buscarOrden",
        type: "POST",
        dataType: 'json',
        processData: false,
        success: function (data) {
            try {
            if ($.fn.DataTable.isDataTable('#tbPendientes')) {
                $('#tbPendientes').DataTable().destroy();
                $('table.DTFC_Cloned').DataTable().destroy();
            }

            $('#tbPendientes tbody').html('');

            var agendar = '';

            //var response = jQuery.parseJSON(data);
            var response = JSON.parse(data.d);
            console.log(response)
            if (response.length > 0) {
                $.each(response, function (i, item) {
                    agendar = agendar.concat(pintarOrdenesXAsignar(item));
                });
                //$('#btnSeleccionar').removeClass('disabled');
                $('#btnSeleccionar').prop('disabled', false);
            }

            $('#tbPendientes tbody').html(agendar);


            $('#tbPendientes').DataTable({
                "scrollY": "330px",
                "scrollCollapse": true,
                "paging": false,
                "scrollX": true,
                fixedColumns: {
                    leftColumns: 1,
                    leftColumns: 2
                }
            });

            } catch (e) { console.log(e) }
        },
        error: function (er) {
            alert(er);
        },
        beforeSend: function () {

            $loading('show');
            //$('.loader-block').show();
        },
        complete: function () {
            //$('.loader-block').hide();
            $loading('hide');
        },
    })

}

function contratasXAsignar($negocio) {

    var options = "";
    var response = post('../formRutinas/Tecnico.aspx/listarContratas', JSON.stringify({ negocio: $negocio }), false);

    $('#cboContrataAsig').html('');
    if (response.data.valor) {

        $.each(response.data.entityD, function (i, item) {
            options = options.concat('<option value="', item.id, '">', item.nombre, '</option>');
        });
        $('#cboContrataAsig').html(options);

        $("#cboContrataAsig").select2({
            theme: "classic"
        });

    }

}

function mark(valor) {
    $('#tbAgendar tbody tr input[type=checkbox]').each(function () {
        this.checked = valor;
    });
}

$('#btnSeleccionar').on('click', function () {

    if ($(this).text().trim() == 'marcar todo') {

        $(this).text('desmarcar todo');
        //$(this).html('<span><i class="icofont icofont - checked"></i></span> desmarcar todo');
        marcarTable('table.DTFC_Cloned', true)
        //marcarTable('#tbPendientes', true)

    }
    else {

        $(this).text('marcar todo');
        //$(this).html('<span><i class="icofont icofont - checked"></i></span> marcar todo');
        marcarTable('table.DTFC_Cloned', false)
        //marcarTable('#tbPendientes', true)
    }

});

function marcarTable($tb, $status) {

    $($tb + ' tbody tr input[type=checkbox]').each(function () {
        this.checked = $status;
    });

    //var table = $($tb).DataTable();re
    //table.rows().every(function (rowIdx, tableLoop, rowLoop) {
    //    var data = this.node();
    //    $(data).find('input[type=checkbox]').prop('checked', $status)
    //});

}



/*********************** fin sumar los minutos disponibles del técnico ********************************************/

var cont;
var ordenes_asig;
$('#btnAsignar').on('click', function () {

    if ($('#hdEstado_actual').val() != 2) {


         cont = 0;
         ordenes_asig = new Array();
        $('table.DTFC_Cloned').find('input[type=checkbox]:checked').each(function () {
            cont = cont + 1;
            ordenes_asig.push({ id: $(this).data("id") });
        });


        //var table = $('#tbPendientes').DataTable();
        //table.rows().every(function (rowIdx, tableLoop, rowLoop) {
        //    debugger;
        //    var data = this.node();
        //    if ($(data).find('input').prop('checked',true)) {
        //        cont = cont + 1;
        //        ordenes_asig.push({ id: $(data).find('input').data("id") });
        //    }
        //});



         if (cont < 1) {
             alert('Para asignar necesita seleccionar ordenes.');
             return;
         }
         else {
           $('#lblCantCheck').text(cont + ' Ordenes seleccionados');
           contratasXAsignar(dUser.oContrata.oNegocio.id);

           $('#mdAsignarContrata').modal('show');
         }
    }
    else {

        alert('La asignación es solo para ordenes pendientes.');

    }

});

$('#btnAsignarContrata').on('click', function () {

    var oUsuario = {
        idUsuario: dUser.idUsuario
        //,
        //oTecnico: {
        //    idTecnico: $('#lblIdTecnico').val()
        //}
    };

    swal({
        title: 'Rutinas',
        text: 'Realizar la asignación de ' + cont + ' casos? ',
        type: 'info',
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        confirmButtonText: "Si, asignar Contrata!",
        closeOnConfirm: false
    },
        function (isConfirm) {

            if (isConfirm) {

                var response = post('../formRutinas/AsignarContrata.aspx/asignarContrataXOrden', JSON.stringify({ oUsuario: oUsuario, idContrata: $('#cboContrataAsig option:selected').val(), lstOrden: ordenes_asig }), false);

                if (response.data.value) {
                    swal({
                        title: 'Rutinas',
                        text: response.data.msg,
                        type: 'success',
                        confirmButtonText: "OK"
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                //location.reload();
                                $('#mdAsignarContrata').modal('hide');
                                if ($('#checkbox1').prop('checked'))
                                    listarOrdenes();
                                else
                                    buscarOrden($('#txtOrden').val(), $('#txtRequerimiento').val());

                            }
                        });
                }
                else {
                    swal({
                        title: 'Rutinas',
                        text: response.data.msg,
                        type: 'error',
                        confirmButtonText: "OK"
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                location.reload();
                            }
                        });
                }

            }

        });

});

var tec;
$('#btnCancelar').click(function () {
    location.reload();
});

$('#btnAsignarMasivo').on('click', function () {
    $('#mdAsignacionMasiva').modal('show');
})

$('#mdAsignacionMasiva').on('show.bs.modal', function () {

    $('#txtListOrdenes').val('');

    $('#cboContrataAsigMasiva').multiselect('destroy');

    /******* lista de contratas *******/
    listarContrata('#cboContrataAsigMasiva', dUser.oContrata.oNegocio.id);

});

$('#btnAsignarM').on('click', function () {

    if ($('#txtListOrdenes').val().trim() == '') {
        alert('Deberá ingresar al menos una orden')
        return;
    }
    else if ($('#cboContrataAsigMasiva option:selected').val() == 0) {
        alert('Seleccionar una Contrata para la asignación.');
    }
    else {

         var data = $('#txtListOrdenes').val();
         var obj = data.replace(/\n/g, " ").split(" ");

         var response = post('../formRutinas/AsignarContrata.aspx/asignacionMasiva_contrata', JSON.stringify({ idContrata: $('#cboContrataAsigMasiva option:selected').val(), ordenes: obj, idAsignador: dUser.idUsuario }), false);


         if (response.data.value) {

             $('#mdAsignacionMasiva').modal('hide');

             swal({
                 title: 'Rutinas',
                 text: response.data.msg,
                 type: 'success',
                 confirmButtonText: "OK"
             },
                 function (isConfirm) {
                     if (isConfirm) {
                         //location.reload();
                     }
                 });
         }
         else
             show_alert(response.data.msg, 'error');
    }
});

function verTelefono($orden) {

    $('#Pagina').attr({ 'style': 'display:none' });

    try {


        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ orden: $orden }),
            url: "../formRutinas/frmAsignarTecnico.aspx/GetTelefono",
            type: "POST",
            dataType: 'json',
            processData: false,
            success: function (data) {

                if (data.d.valor) {

                    //$('#lblMensajeImg').text('');
                    //$("#lstEvidencias").html('');

                    var val = data.d.entity;

                    //$('#txtidTicketHidden').val(val.id);
                    //$('#lblEstado').attr({ 'class': 'label label-lg label-success', 'style': 'display:block;' }).text(val.Estado.detalle);
                    //$('#lblActividad').prop({ 'class': 'label label-lg label-primary', 'style': '' }).text(val.Rutina.actividad.descripcion);
                    //$('#lblContrataa').val(val.Nodo.Contrata.nombre);
                    //$('#lblTecnico').val(val.Usuario.nombre);
                    //$('#lblOrden').text(val.ot);


                    //idCliente = val.Cliente.id;
                    //$('#txtCodCliente').val(val.Cliente.codCliente)
                    $('#txtNomClienteTelf').val(val.Cliente.nomCliente);
                    $('#txtDisClienteTelf').val(val.Cliente.distrito);

                    $('#lblIdCliente').val(val.Cliente.id);


                    /**************************** Teléfonos ***********************************/
                    var phones = '';
                    $.each(val.Cliente.telefonos, function (i, item) {
                        phones = phones.concat(pintarTelefonos(i + 10, item));
                    });
                    $('#tbTelefonos tbody').html(phones);

                    aloneNumeric('numeric');

                    $('#mdlTelefono').modal('show');

                }
                else
                    show_alert(data.d.msg, 'info');

            },
            error: function (er) {
                alert(er);
            },
            beforeSend: function () {

                $loading('show');
            },
            complete: function () {

                $loading('hide');
            },

        })

    } catch (e) {
        alert(e);
    }

};

function delete_telf(e) {
    //$('#' + e).fadeOut();
    $("#" + e).remove();
}

var t = 26;
$('#txtTelefono').keypress(function (e) {
    if (e.which == 13) {
        if ($(this).val() != '') {

            var i = 0;
            $("#tbTelefonos tbody tr").each(function () {
                if ($(this).find('td').eq(0).text() == $('#txtTelefono').val()) {
                    i = i + 1;
                }
            });

            if (i > 0)
                alert('El teléfono ya se encuentra en la lista');
            else {

                var numero = '<tr id="' + t + '">\
                   <td>!lblTelefono!</td>\
                   <td class="text-right">\
                       <label class="f-right">\
                          <i class="icofont icofont-ui-delete f-20" onclick="delete_telf(' + t + ')" style="color:red"></i>\
                       </label>\
                   </td>\
                 </tr>';

                numero = numero.replace("!lblTelefono!", $(this).val());

                t++;

                $(numero).appendTo('#tbTelefonos');
                $('#txtTelefono').val('');
            }
        }
        else
            alert('No se permiten valores vacíos');
    }
});

var $cboWebSearch = document.getElementById("cboWebSearch");
$cboWebSearch.addEventListener("change", function () {

    if ($(this).val() == 'about:blank') {
        $('#Pagina').attr({ 'style': 'display:none' });
    }
    else {
        $('#Pagina').attr({ 'style': 'display:block' });
        document.getElementById('ifmWeb').src = $cboWebSearch.value;
        $("#ifmWeb").contents().find(".titulo").css("color", "#000");
    }
});

$('#btnSavePhone').on('click', function () {

    if ($('#txtTelefono').val() != '') {
        alert('Tienes un registro en la caja de texto, desea agregar a la lista?');
        return;
    }

    //if ($('#tbTelefonos').find("i").length > 0) {

        var telefonos = [];
        $("#tbTelefonos tbody tr").each(function () {
            var data = {
                numero: $(this).find("td").eq(0).text(),
                estado: $(this).find("td").find("label").find("input[type=checkbox]").prop('checked') ? '1' : ($(this).find("td").find("label").find("i").hasClass('icofont-ui-delete') ? '1' : '0')
            };
            telefonos.push(data);
        })

        var datos = { id: $('#lblIdCliente').val(), telefonos: telefonos }

        var response = post('../formRutinas/Tracking.aspx/editarTelfCliente', JSON.stringify({ cliente: datos, usuario: dUser.idUsuario }), false);

        if (response.data.value) {

            $('#mdlTelefono').modal('hide');

            swal({
                title: 'Rutinas',
                text: 'Registrado correctamente',
                type: 'success',
                confirmButtonText: "OK"
            },
                function (isConfirm) {
                    if (isConfirm) {

                    }
                });
        }
        else
            show_alert(response.data.msg, 'error');
    //}
    //else
    //    alert('No hay registros para guardar.');
});

function verNota($idOrden) {

    try {


        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ IdOrden: $idOrden }),
            url: "../formRutinas/AsignarContrata.aspx/mostrarNotas",
            type: "POST",
            dataType: 'json',
            processData: false,
            success: function (data) {

                //if (JSON.parse(data.d).length > 0) {

                $('#cardNotas').html('');

                $('#lblOrdenNota').text('Orden:  ' + JSON.parse(data.d)[0].OT);
                $('#lblIdOrden').val(JSON.parse(data.d)[0].id);

                    if (JSON.parse(data.d)[0].IdOrden != null) {

                        $.each(JSON.parse(data.d), function (i, item) {

                            $('<div>').attr({ 'class': 'media' }).append(
                                $('<div>').attr({ 'class': 'media-body b-b-muted social-client-description' }).append(
                                    $('<div>').attr({ 'class': 'chat-header' }).text(item.nombre + ' ' + item.apellidos).append(
                                        $('<span>').attr({ 'class': 'text-muted' }).text(item.Fecha_registro)
                                    ),
                                    $('<p>').attr({ 'class': 'text-muted' }).text(item.Descripcion)
                                )
                            ).appendTo('#cardNotas');

                        });

                    }



                    $('#mdlNota').modal('show');

                //}
                //else
                //    show_alert(data.d.msg, 'info');

            },
            error: function (er) {
                alert(er);
            },
            beforeSend: function () {

                //$loading('show');
            },
            complete: function () {

                //$loading('hide');
            },

        })

    } catch (e) {
        alert(e);
    }

};


$('#btnEnviar').on('click', function () {

    if ($('#txtNota').val().trim() != '') {

        var datos = {
            idOrden: parseInt($('#lblIdOrden').val()),
            oUsuario: {
                idUsuario: dUser.idUsuario
            },
            Descripcion: $('#txtNota').val()
        }

        var response = post('../formRutinas/AsignarContrata.aspx/registrarNota', JSON.stringify({ oNotaHistorial: datos }), false);

        if (response.data.value) {

            verNota(parseInt($('#lblIdOrden').val()));

            //$('<div>').attr({ 'class': 'media' }).append(
            //    $('<div>').attr({ 'class': 'media-body b-b-muted social-client-description' }).append(
            //        $('<div>').attr({ 'class': 'chat-header' }).text(dUser.nombre + ' ' + dUser.apellidos).append(
            //            $('<label>').attr({ 'class': 'label bg-success', 'style': 'margin-left: 8px;' }).text('Nuevo')
            //        ),
            //        $('<p>').attr({ 'class': 'text-muted' }).text($('#txtNota').val())
            //    )
            //).appendTo('#cardNotas');

            $('#txtNota').val('').focus();

        }

    }
    else {
        alert('No se aceptan valores vacíos');
    }


});

function verAgendamiento($idOrden, $ot) {
    try {
        $('#txtOrdenAg').val($idOrden)
        $('#mdlAgendamiento').modal('show');
        $('#lblOrden').text($ot)

    } catch (e) {
        alert(e);
    }

};

$('#btnGuardarAgendamiento').on('click', function () {
    var $ot = $('#lblOrden').text()
    if ($('#txtObsAgendamiento').val() == '') {
        alert('Debe ingresar una Observacion')
        return
    }

    var data = { idOrden: parseInt($('#txtOrdenAg').val()), fecha: fechaAgendamiento, idUsuario: dUser.idUsuario, obs: $('#txtObsAgendamiento').val() }
    var response = post('../formRutinas/AsignarContrata.aspx/registrarAgendamiento', JSON.stringify(data), false);
    console.log(response)
    $('#mdlAgendamiento').modal('hide');
    $('#txtObsAgendamiento').val('')
    //if ($ot == undefined || $ot == '') {
    //    listarOrdenes()
    //} else {
    //    buscarOrden($ot,'')
    //}

})



$('#txtFecha').on('dp.change', function (event) {
    fechaAgendamiento = event.date.format('YYYYMMDD h:mm')
    console.log(event.date.format('YYYYMMDD h:mm'))
});
