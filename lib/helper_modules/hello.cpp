#include <node_api.h>
#include <stdlib.h>
#include <stdio.h>

namespace demo {

/*
* Works with the n_api to convert a JS string to a C++ char array
*/
char *convert_to_cpp_char_arr(napi_env env, napi_callback_info args) {
  napi_status status;
  size_t argc = 1;
  size_t str_size;
  napi_value argv[1];
  char *string;

  status = napi_get_cb_info(env, args, &argc, argv, NULL, NULL);
  if (status != napi_ok) {
    napi_throw_error(env, NULL, "Failed to parse arguments");
  }

  status = napi_get_value_string_utf8(env, argv[0], NULL, 0, &str_size);
  if (status != napi_ok) {
      napi_throw_error(env, NULL, "Invalid number was passed as argument");
  }
  str_size += 1;
  string = (char *) malloc(str_size);

  status = napi_get_value_string_utf8(env, argv[0], string, str_size, NULL);

  if (status != napi_ok) {
      napi_throw_error(env, NULL, "Invalid number was passed as argument");
  }

  return string;
}

/*
* Works with the n_api to convert a C++ char array to a JS string
*/
napi_value convert_to_js_str(napi_env env, char *string) {
  napi_status status;
  napi_value js_str;

  status = napi_create_string_utf8(env, string, NAPI_AUTO_LENGTH, &js_str);
  if (status != napi_ok) {
    napi_throw_error(env, NULL, "Unable to obtain value from C++ array");
  }
  return js_str;
}

napi_value format_code(napi_env env, napi_callback_info args) {
  char *string = convert_to_cpp_char_arr(env, args);
  // TODO: implement logic for formatting code
  napi_value js_str = convert_to_js_str(env, string);
  free(string);
  return js_str;
}

/* 
* Initializes the module
*/
napi_value init(napi_env env, napi_value exports) {
  napi_status status;
  napi_value fn;

  status = napi_create_function(env, nullptr, 0, format_code, nullptr, &fn);
  if (status != napi_ok) return nullptr;

  status = napi_set_named_property(env, exports, "format_code", fn);
  if (status != napi_ok) return nullptr;
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)

}  // namespace demo