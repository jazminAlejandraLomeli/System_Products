<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
 use App\Service\LoginService;
 use Auth;
 use Illuminate\Http\Request;
 use Illuminate\Routing\Controller;

class LoginController extends Controller
{
    public function create(LoginRequest $request)
    {
        try {
            $data = $request->all();

            // Llamar servicio
            $user = (new LoginService())->login($data); // instancia del servicio

            // Si no existe el usuario o contraseña incorrecta
            if (!$user) {
                return response()->json([
                    'error' => 'Credenciales incorrectas',
                ], 401);
            }

            // Aquí ya $user es un objeto válido
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login exitoso',
                'token' => $token,
                'user' => $user
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al procesar la solicitud',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    // Logout y eliminar token actual
    public function destroy(Request $request)
    {
        // Eliminar el token actual del usuario
        $token = $request->user()->currentAccessToken();
        if ($token) {
            $token->delete();
        }

        return response()->json([
            'message' => 'Logout exitoso'
        ]);
    }



    // Obtener info del usuario autenticado
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

}
